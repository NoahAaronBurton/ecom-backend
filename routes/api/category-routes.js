const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => { //* async functs always return a promise
  // find all categories
  try{ //* body of the Promise (categoryData)... 
    const categoryData = await Category.findAll({include:[{ //* is determined by the result of the Category.findAll operation
      model: Product
    }]});
    res.status(200).json(categoryData)
     
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryById = await Category.findByPk(req.params.id, {include: Product});
    if (!categoryById) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateCategory[0]) {
      res.status(404).json({message: 'No Category with this id!'});
      return;
    }
    res.status(200).json(updateCategory) 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deleteCategory) {
      res.status(404).json({message: 'no Category with that id!'})
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
