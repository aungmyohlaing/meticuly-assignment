import { Request, Response } from 'express';
import { Customer } from '../models/customer';
import Fuse from 'fuse.js';

export const addCustomer = async (req: Request, res: Response) => {  
  let { firstName, lastName, phoneNumber, email, address, checkOnly } = req.body;  

  try {
    checkOnly = checkOnly === true || checkOnly === 'true';

    if (!firstName || !lastName || !phoneNumber) {
      res.status(400).json({ 
        message: 'First name, last name and phone number are required',
        status: 400
      });      
      return;
    }

    const allCustomers = await Customer.findAll();
    
    const fuseOptions = {
      keys: [
        { name: 'firstName', weight: 2 },
        { name: 'lastName', weight: 2 }
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
      location: 0,
      distance: 50,
      useExtendedSearch: true
    };

    const fuse = new Fuse(allCustomers, fuseOptions);

    const firstNameResults = fuse.search(firstName);
    const lastNameResults = fuse.search(lastName);
    const fullNameResults = fuse.search(`${firstName} ${lastName}`);
    
    const searchResults = [...new Set([...firstNameResults, ...lastNameResults, ...fullNameResults])];
    
    const similarCustomers = searchResults
      .filter(result => {
        if (!result.score) return false;
        
        if (result.item.firstName.toLowerCase() === firstName.toLowerCase() && 
            result.item.lastName.toLowerCase() === lastName.toLowerCase()) {
          return true;
        }
        
        return result.score < 0.4;
      })
      .map(result => result.item);

    const uniqueSimilarCustomers = similarCustomers.filter((customer, index, self) =>
      index === self.findIndex((c) => 
        c.firstName.toLowerCase() === customer.firstName.toLowerCase() && 
        c.lastName.toLowerCase() === customer.lastName.toLowerCase()
      )
    );

    if (checkOnly) {
      res.status(200).json({
        data: uniqueSimilarCustomers,
        status: 200
      });
      return;
    }

    const phoneDuplicate = await Customer.findOne({
      where: {
        phoneNumber: phoneNumber
      }
    });    

    if (phoneDuplicate) {
      res.status(409).json({ 
        message: 'Customer already exists with the same phone number',
        status: 409
      });
      return;
    }

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
    });

    res.status(201).json({
      data: newCustomer,
      status: 201
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: 500
    });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();

  if (!customers) {
    res.status(404).json({
      message: 'No customers found',
      status: 404
    });
    return;
  }
  res.status(200).json({
    data: customers,
      status: 200
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: 500
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try { 
  const { id } = req.params;
  const customer = await Customer.findByPk(id);
  if (!customer) {
    res.status(404).json({
      message: 'Customer not found',
      status: 404
    });
    return;
  }

  await customer.destroy();  
  res.status(200).json({
    message: 'Customer deleted successfully',
    status: 200
  });
  
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: 500
    });
  }
};