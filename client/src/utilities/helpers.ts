import { IMetricResponse } from '../types';

export const inputValidationMessages = {
  nameEmpty: 'Name input cannot be empty',
  valueEmpty: 'Value input cannot be empty',
  invalidValue: 'Value can only be a number',
};

export const showPaginationInfo = (pagination: IMetricResponse['pagination']) => {
  const { page, pageSize, totalCount, limit} = pagination;
  const firstRecord = ((page - 1) * limit) + 1;
  const lastRecord =  ((page - 1) * limit) + pageSize;
  return `Showing ${firstRecord} - ${lastRecord} of ${totalCount} Records`;
};

export const inputValidationMessage = (name: string, value: string | number) => {
  const messageArray = [];
  if (!name) {
    messageArray.push(inputValidationMessages.nameEmpty);
  }
  if (!value) {
    messageArray.push(inputValidationMessages.valueEmpty);
  }
  if (isNaN(Number(value))) {
    messageArray.push(inputValidationMessages.invalidValue);
  }
  return messageArray;
};
