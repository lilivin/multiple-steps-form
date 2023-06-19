import React, { useContext } from 'react';
import { renderHook } from '@testing-library/react';
import FormProvider, { AddOnsEnum, FormContext, defaultFormError, defaultFormInfo } from '../formContext';
import { act } from 'react-dom/test-utils';

describe('FormProvider', () => {
  test('should initialize with the default values', () => {
    const { result } = renderHook(() => useContext(FormContext), {
      wrapper: FormProvider,
    });

    expect(result.current?.currentPage).toBe(1);
    expect(result.current?.formInfo).toEqual(defaultFormInfo);
    expect(result.current?.formError).toEqual(defaultFormError);
  });

  test('should update formInfo correctly', () => {
    const { result } = renderHook(() => useContext(FormContext), {
      wrapper: FormProvider,
    });

    act(() => {
      result.current?.updateForm({ name: 'name', value: 'John' });
    });

    expect(result.current?.formInfo.name).toBe('John');
  });

  test('should update formInfo correctly 2', () => {
    const { result } = renderHook(() => useContext(FormContext), {
      wrapper: FormProvider,
    });

    act(() => {
      result.current?.updateForm({ name: 'addOns', value: AddOnsEnum.LargerStorage });
    });

    expect(result.current?.formInfo.addOns).toContain(AddOnsEnum.LargerStorage);
  });
});