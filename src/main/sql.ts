import exp from 'constants';
import { app } from 'electron';
import path from 'path';
import { Sequelize, Model, DataTypes } from 'Sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(app.getPath('desktop'), 'test.db'),
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: 'user' }
);
const main = async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  console.log(jane.toJSON());

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const addUser = async (user: any) => {
  console.log('addUser user: ', user);
  User.create(user);
};

export const deleteUser = async ({ name }) => {
  await User.destroy({
    where: {
      username: name,
    },
  });
};

export const updateUser = async ({ originName, newName }) => {
  await User.update(
    { username: newName },
    {
      where: {
        username: originName,
      },
    }
  );
};

export const findUser = async ({ username }) => {
  // 查询所有用户
  const users = await User.findAll({
    raw: true,
    where: {
      username,
    },
  });
  return users;
};

export default { main, addUser, deleteUser, updateUser, findUser };
