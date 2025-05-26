import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface CustomerAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public email!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // define association here (e.g., Customer.belongsTo(models.User))
  }
}

export function initCustomerModel(sequelize: Sequelize): typeof Customer {
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'Customers',
    }
  );

  return Customer;
}
