const { DataTypes, Sequelize } = require('sequelize');
const { uri } = require('../config/database.js');
const { User } = require('./user.js');

const sequelize = new Sequelize(uri);

const Task = sequelize.define('Task', {
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.TEXT, allowNull: false },
   finishDate: { type: DataTypes.DATE, allowNull: true },
   progress: { type: DataTypes.FLOAT, defaultValue: 0 },
   userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, // Nome da tabela do usuário
      key: 'id'
    }},
   favorite: {type: DataTypes.BOOLEAN, defaultValue: false}
},{
    timestamps: true, // Defina como `true` se você usar timestamps
  }
);

const TaskItem = sequelize.define('TaskItem', {
   title: { type: DataTypes.STRING, allowNull: false },
   status: { type: DataTypes.BOOLEAN, defaultValue: false }, // Completado ou não
   taskId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Task, // Referência ao modelo de tarefa
      key: 'id'
      }, 
    },
},{
    timestamps: true, // Defina como `true` se você usar timestamps
  });

// Relacionamento Task - TaskItem
Task.hasMany(TaskItem, { foreignKey: 'taskId' });
TaskItem.belongsTo(Task, { foreignKey: 'taskId' });

// Relacionamento User - Task
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sincronizar o modelo com o banco de dados    
sequelize.sync({alter:true}); // Usa alter para ajustar a tabela existente

module.exports = { Task, TaskItem };
