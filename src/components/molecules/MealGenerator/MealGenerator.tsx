import React, { useState } from 'react';

import {
  Tab,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

import { dataTestIds } from '../../../dataTest/dataTestIds';

import {
  GeneratorContainer,
  TabsContainer,
  TabPanel,
  GenerateButton,
  InputField,
} from './MealGenerator.styles';

const mealTypes = ['Main Course', 'Breakfast', 'Dessert'];

export type paramsType = {
  type?: string;
  query?: string;
  minCalories?: number;
  maxCalories?: number;
  minSugar?: number;
  maxSugar?: number;
};

interface MealGeneratorProps {
  isLoading: boolean;
  onGenerate: (params: paramsType) => void;
  resetSelectedRecipe: () => void;
}

export const MealGenerator: React.FC<MealGeneratorProps> = (
  { isLoading, onGenerate, resetSelectedRecipe }
) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setFormValues({});
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    try {
      const type = mealTypes[selectedTab].toLowerCase();

      const params: paramsType = {
        type,
        query: formValues.query?.trim() || undefined,
      };

      if (type === 'dessert') {
        params.minSugar = formValues.minSugar ? Number(formValues.minSugar) : undefined;
        params.maxSugar = formValues.maxSugar ? Number(formValues.maxSugar) : undefined;
      }

      if (type === 'main course' || type === 'breakfast') {
        params.minCalories = formValues.minCalories ? Number(formValues.minCalories) : undefined;
        params.maxCalories = formValues.maxCalories ? Number(formValues.maxCalories) : undefined;
      }
      onGenerate(params);
      resetSelectedRecipe();
    } catch (error) {
      console.error('Error generating meals:', error);
    }
  };

  // Render input fields based on selectedTab
  const renderFormFields = () => {
    switch (mealTypes[selectedTab]) {
      case 'Main Course':
        return (
          <>
            <InputField
              label='Recipe Search Query'
              variant='outlined'
              fullWidth
              name='query'
              value={formValues.query || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.queryInput}
            />
            <InputField
              label='Min Calories'
              variant='outlined'
              type='number'
              fullWidth
              name='minCalories'
              value={formValues.minCalories || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.minCaloriesInput}
            />
            <InputField
              label='Max Calories'
              variant='outlined'
              type='number'
              fullWidth
              name='maxCalories'
              value={formValues.maxCalories || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.maxCaloriesInput}
            />
          </>
        );
      case 'Breakfast':
        return (
          <>
            <InputField
              label='Recipe Search Query'
              variant='outlined'
              fullWidth
              name='query'
              value={formValues.query || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.queryInput}
            />
            <InputField
              label='Min Calories'
              variant='outlined'
              type='number'
              fullWidth
              name='minCalories'
              value={formValues.minCalories || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.minCaloriesInput}
            />
            <InputField
              label='Max Calories'
              variant='outlined'
              type='number'
              fullWidth
              name='maxCalories'
              value={formValues.maxCalories || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.maxCaloriesInput}
            />
          </>
        );
      case 'Dessert':
        return (
          <>
            <InputField
              label='Recipe Search Query'
              variant='outlined'
              fullWidth
              name='query'
              value={formValues.query || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.queryInput}
            />
            <InputField
              label='Min Sugar (grams)'
              variant='outlined'
              type='number'
              fullWidth
              name='minSugar'
              value={formValues.minSugar || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.minSugarInput}
            />
            <InputField
              label='Max Sugar (grams)'
              variant='outlined'
              type='number'
              fullWidth
              name='maxSugar'
              value={formValues.maxSugar || ''}
              onChange={handleInputChange}
              data-testid={dataTestIds.components.mealGenerator.maxSugarInput}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <GeneratorContainer data-testid={dataTestIds.components.mealGenerator.container}>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4' gutterBottom>
          Meal Generator
        </Typography>
      </Box>
      <TabsContainer
        value={selectedTab}
        onChange={handleTabChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='Meal Type Tabs'
      >
        {mealTypes.map((meal, index) => (
          <Tab
            key={meal}
            label={meal}
            disabled={isLoading}
            id={`meal-tab-${index}`}
            aria-controls={`meal-tabpanel-${index}`}
            data-testid={dataTestIds.components.mealGenerator.tab(meal.toLowerCase())}
          />
        ))}
      </TabsContainer>
      <TabPanel>
        {isLoading ? (
          <Box
            display='flex'
            justifyContent='center'
            sx={{
              height: '210px',
              alignItems: 'center',
            }}
            data-testid={dataTestIds.components.mealGenerator.loadingIndicator}
          >
            <CircularProgress />
          </Box>
        ) : (
          renderFormFields()
        )}
        <GenerateButton
          variant='contained'
          onClick={handleGenerate}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
          data-testid={dataTestIds.components.mealGenerator.generateButton}
        >
          {isLoading ? 'Generating...' : 'Generate Meals'}
        </GenerateButton>
      </TabPanel>
    </GeneratorContainer>
  );
};
