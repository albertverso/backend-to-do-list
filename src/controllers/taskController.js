const { Task, TaskItem } = require('../models/task');

// Criar nova tarefa
const createTask = async (req, res) => {
   const { title, description, finishDate, userId, taskItems } = req.body;

   try {
      // Criar a Task
      const task = await Task.create({ title, description, finishDate, userId });

      // Verificar se há taskItems e criar TaskItems relacionados
      if (taskItems && taskItems.length > 0) {
         const itemsToCreate = taskItems.map(item => ({
            ...item,
            taskId: task.id // associar o taskId à TaskItem
         }));

         await TaskItem.bulkCreate(itemsToCreate);
      }

      // Retornar a task com os taskItems
      const taskWithItems = await Task.findByPk(task.id, {
         include: TaskItem
      });

      res.status(201).json(taskWithItems);
   } catch (err) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
   }
};

// Obter tarefas do usuário pelo Id
const getTask = async (req, res) => {
   const { id } = req.params; // Pega o id da URL

   try {
      // Busca a task pelo id e inclui os TaskItems
      const task = await Task.findOne({
         where: { id },
         include: [{ model: TaskItem }]  // Inclui o modelo TaskItem
      });

      // Verifica se a task foi encontrada
      if (!task) {
         return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      // Retorna a task e seus itens
      res.status(200).json(task);
   } catch (err) {
      console.error('Erro ao buscar tarefa:', err);
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
   }
};

const getAllTask = async (req, res) => {
   const { userId } = req.params; // Pegar o userId da URL

   try {
      const tasks = await Task.findAll({
         where: { userId }, // Filtra as tarefas pelo userId
         include: [{ model: TaskItem }]  // Inclui os TaskItems
      });

      if (!tasks.length) {
         return res.status(404).json({ error: 'Nenhuma tarefa encontrada para este usuário' });
      }

      res.status(200).json(tasks);
   } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
   }
};


// Rota para atualizar uma tarefa existente
const updateTask = async (req, res) => {
   const { taskId } = req.params;
   const { title, description, finishDate, progress, taskItems, favorite } = req.body;

   try {
      const task = await Task.findByPk(taskId);

      if (!task) {
         return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      // Atualiza os campos permitidos
      task.title = title || task.title;
      task.description = description || task.description;
      task.finishDate = finishDate || task.finishDate;
      task.progress = progress || task.progress;
      task.favorite = favorite !== undefined ? favorite : task.favorite;

      await task.save();

      // Atualizar ou criar TaskItems
      if (taskItems && Array.isArray(taskItems)) {
         for (const item of taskItems) {
            const { id, title, status } = item;

            if (id) {
               // Se o id existir, atualiza o TaskItem
               const taskItem = await TaskItem.findByPk(id);
               if (taskItem) {
                  taskItem.title = title !== undefined ? title : taskItem.title;
                  taskItem.status = status !== undefined ? status : taskItem.status;
                  await taskItem.save();
               }
            } else {
               // Se não houver id, cria um novo TaskItem
               await TaskItem.create({
                  title,
                  status,
                  taskId: task.id // Relaciona com a Task
               });
            }
         }
      }

      res.json({ message: 'Task e seus itens atualizados com sucesso', task });
   } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
   }
};

// Rota para deletar uma tarefa
const deleteTask = async (req, res) => {
   const { taskId } = req.params;

   try {
      const task = await Task.findByPk(taskId);

      if (!task) {
         return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      await task.destroy();

      res.json({ message: 'Tarefa deletada com sucesso.' });
   } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a tarefa.' });
   }
};

// Rota para excluir um TaskItem
const deleteTaskItems = async (req, res) => {
   const { taskId, itemId } = req.params;

   try {
      // Verifique se a Task existe
      const task = await Task.findByPk(taskId);
      if (!task) {
         return res.status(404).json({ message: 'Task não encontrada.' });
      }

      // Verifique se o TaskItem existe e está associado à Task
      const taskItem = await TaskItem.findOne({ where: { id: itemId, taskId } });
      if (!taskItem) {
         return res.status(404).json({ message: 'TaskItem não encontrado ou não está associado à Task.' });
      }

      // Exclua o TaskItem
      await taskItem.destroy();

      res.status(200).json({ message: 'TaskItem excluído com sucesso.' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir TaskItem.' });
   }
};

// Rota para buscar tasks favoritadas pelo userId
const getFavorites = async (req, res) => {
    const { userId } = req.params; // Pegar o userId da URL

    try {
        const tasks = await Task.findAll({
            where: { userId, favorite: true }, // Filtra as tarefas favoritas pelo userId
            include: [{ model: TaskItem }]  // Inclui os TaskItems
        });

        if (!tasks.length) {
            return res.status(404).json({ error: 'Nenhuma tarefa favorita encontrada para este usuário' });
        }

        res.status(200).json(tasks);
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
};

module.exports = {
   getTask, createTask, deleteTask, updateTask, deleteTaskItems, getAllTask, getFavorites
};
