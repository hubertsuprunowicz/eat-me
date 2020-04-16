import React from 'react';
import { Box, Button, Text } from 'style';
import Form from 'component/Form/Form';
import { RecipeFilter } from './RecipesView';
import { useForm } from 'react-hook-form';

type RecipeFilterForm = {
  [key in
    | 'tag'
    | 'price.from'
    | 'price.to'
    | 'time.from'
    | 'time.to'
    | 'difficulty']: string;
};

type Props = {
  setIsOpen: (arg: boolean) => void;
  setFilter: (arg: RecipeFilter) => void;
};

const Filter: React.FC<Props> = ({ setIsOpen, setFilter }) => {
  const { register, watch } = useForm<RecipeFilterForm>();
  const filter = watch();

  const handleFilter = () => {
    if (!filter) return;
    const tagObject = filter['tag'] ? { name: filter['tag'] } : undefined;
    setFilter({
      difficulty: filter['difficulty']
        ? (filter['difficulty'] as 'EASY' | 'MEDIUM' | 'HARD')
        : undefined,
      tag: tagObject,
      time_gte: filter['time.from']
        ? parseFloat(filter['time.from'])
        : undefined,
      time_lte: filter['time.to'] ? parseFloat(filter['time.to']) : undefined,
      totalCost_gte: filter['price.from']
        ? parseFloat(filter['price.from'])
        : undefined,
      totalCost_lte: filter['price.to']
        ? parseFloat(filter['price.to'])
        : undefined,
    });
    setIsOpen(false);
  };

  return (
    <Form className={'filter'}>
      <Box display={'flex'} flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="title">
          <span>Tag</span>
        </label>
        <input type="text" placeholder="Enter Tag" name="tag" ref={register} />
        <label htmlFor="difficulty">
          <span>Difficulty</span>
        </label>
        <Box display={'flex'}>
          <select name="difficulty" ref={register}>
            <option value={undefined}></option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </Box>
        <label htmlFor="title">
          <span>Price</span>
        </label>
        <Box display="flex" alignItems="baseline">
          <input
            type="number"
            placeholder="From i.e. 20"
            name="price.from"
            ref={register}
          />
          <Text fontSize={4} ml={4} mr={4}>
            -
          </Text>
          <input
            type="number"
            placeholder="To i.e. 40"
            name="price.to"
            ref={register}
          />
        </Box>
        <label htmlFor="title">
          <span>Time</span>
        </label>
        <Box display="flex" alignItems="baseline">
          <input
            type="number"
            placeholder="From i.e. 30"
            name="time.from"
            ref={register}
          />
          <Text fontSize={4} ml={4} mr={4}>
            -
          </Text>
          <input
            type="number"
            placeholder="To i.e. 55"
            name="time.to"
            ref={register}
          />
        </Box>
      </Box>
      <Box mb={6} width="100%" display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="button"
            onClick={handleFilter}
            p={5}
            color={'secondary.500'}
            boxShadow="neumorphism"
            mr={5}
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            p={5}
            color={'danger.500'}
            boxShadow="neumorphism"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default Filter;
