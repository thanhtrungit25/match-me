import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

export default function EmptyState(){
  return (
    <div className='flex items-center justify-center mt-20'>
      <Card className='p-5'>
        <CardHeader className='text-3xl text-default'>
          There are no results for this filter
        </CardHeader>
        <CardBody className="text-center">
          Please select a different filter
        </CardBody>
      </Card>
    </div>
  );
};