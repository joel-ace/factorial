import { NextFunction, Request, Response } from 'express';
import {
  handleError,
  sanitizeNameInput,
  generateAverageQuery,
  generatePaginationData,
} from './utils';
import { res } from '../testData';

describe('handleError', () => {
  it('trims extra spaces', () => {
    const message = 'This is an error';
    const response = handleError(res, message);
    expect(response.status).toEqual(500);
    expect(response.message).toEqual(message);
  });

  it('converts text to lowecase', () => {
    const text = 'Another teXT';
    const expectedResult = 'another text';
    const trimmedText = sanitizeNameInput(text);
    expect(trimmedText).toEqual(expectedResult);
  });
});

describe('sanitizeNameInput', () => {
  it('trims extra spaces', () => {
    const text = ' this space    ';
    const expectedResult = 'this space';
    const trimmedText = sanitizeNameInput(text);
    expect(trimmedText).toEqual(expectedResult);
  });

  it('converts text to lowecase', () => {
    const text = 'Another teXT';
    const expectedResult = 'another text';
    const trimmedText = sanitizeNameInput(text);
    expect(trimmedText).toEqual(expectedResult);
  });
});

describe('generatePaginationData', () => {
  it('return a pagination object', () => {
    const expectedResult = {
      page: 2,
      pageSize: 3,
      limit: 3,
      pageCount: 4,
      totalCount: 10,
    };
    const paginationObject = generatePaginationData(2, 3, 23, 10);
    expect(paginationObject).toEqual(expectedResult);
  });
});

describe('generateAverageQuery', () => {
  const oneDayAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));

  it('returns a mongodb query', () => {
    const expectedResult =   [
      {
        $match: {
          'name': 'hair',
          'createdAt': {
            '$gte': oneDayAgo,
            '$lt':  new Date(Date.now()),            
          }
        }
      },
      {
        $group: {
          _id: null,
          average: { $avg: "$value" }
        }
      }
    ];
  
    const mongoQuery = generateAverageQuery('hair', oneDayAgo);
    expect(mongoQuery).toEqual(expectedResult);
  });
});

