import { showPaginationInfo, inputValidationMessage, inputValidationMessages } from './helpers';

const mockPaginationData = {
  page: 4,
  pageCount: 5,
  pageSize: 3,
  totalCount: 14,
  limit: 3,
};

describe('helper utilities', () => {
  describe('showPaginationInfo', () => {
    it('should return pagination string', () => {
      const paginationInfo = showPaginationInfo(mockPaginationData);
      const expectedResult = 'Showing 10 - 12 of 14 Records';
      expect(paginationInfo).toEqual(expectedResult);
  });
});

  describe('inputValidationMessage', () => {
    it('should return an array containing name is empty message', () => {
      const validationMessage = inputValidationMessage('', 30);
      expect(validationMessage[0]).toEqual(inputValidationMessages.nameEmpty);
    });

    it('should return an array containing value is empty message', () => {
      const validationMessage = inputValidationMessage('height', '');
      expect(validationMessage[0]).toEqual(inputValidationMessages.valueEmpty);
    });

    it('should return an array containing value is invalid message', () => {
      const validationMessage = inputValidationMessage('height', 'something');
      expect(validationMessage[0]).toEqual(inputValidationMessages.invalidValue);
    });

    it('should not return an empty array when value and name is provided', () => {
      const validationMessage = inputValidationMessage('height', 30);
      expect(validationMessage).toEqual([]);
    });
  });
});