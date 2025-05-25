import React from 'react';
import { useFilters } from '@/hooks/useFilters';

import { Button, Select, SelectItem, Slider, Spinner, Switch } from '@heroui/react';

export default function Filters(){

  const { genderList, selectGender, selectAge, selectWithPhoto, orderByList, selectOrder, filters, isPending } = useFilters();

  const { gender, ageRange, orderBy } = filters;

  return (
    <div className='py-2 shadow-md'>

      <div className="flex flex-row justify-around items-center">

        <div className='flex gap-2 items-center'>
          <div className='text-default font-semibold text-xl'>
            {isPending && (
              <Spinner
                size='sm'
                color='default'
              />
            )}
          </div>
        </div>

        {/* Gender */}
        <div className='flex gap-2 items-center'>
          <div>Gender:</div>
          {genderList.map(
            ({ icon: Icon, value }) => (
              <Button
                key={value}
                size='sm'
                isIconOnly
                color='default'
                variant={
                  gender.includes(value)
                    ? "solid"
                    : "light"
                }
                onPress={() => selectGender(value)}
              >
                <Icon size={24} />
              </Button>
            )
          )}
        </div>

        {/* Age range */}
        <div className='flex flex-row items-center gap-2 w-1/4'>
          <Slider
            label="Age range"
            size='sm'
            minValue={18}
            maxValue={100}
            defaultValue={ageRange}
            color='foreground'
            aria-label='Age range slider'
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>

        {/* With Photo */}
        <div className='flex flex-col items-center'>
          <p>With photo</p>
          <Switch
            size='sm'
            color='default'
            defaultSelected
            onChange={(checked) => selectWithPhoto(checked)}
          />
        </div>

        <div className='w-1/4'>
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem
                key={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>

      </div>

    </div>
  );
};