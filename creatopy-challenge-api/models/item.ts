import { Model } from 'sequelize';

interface ItemAttributes {
  id: number;
  title: string;
}

export interface ItemInput {
  title: string;
  userId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Item extends Model<ItemAttributes>
    implements ItemAttributes{
    id!: number;
    title!: string;

    static associate(models: any) {
      // define association here
      Item.belongsTo(models.User, {  })
    }
  }
  Item.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
