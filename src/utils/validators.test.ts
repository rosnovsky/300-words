import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { noteDataSchema, validateInput } from './validatiors'

describe('Validators', () => {
  it("should call the handler with validated input when input data is valid", async () => {
    const body = {
      content: 'test! Aniother test! Dflkj dfslkd klj',
      title: 'April 24, 2023 at 12:34 PM'
    }

    const result = validateInput(noteDataSchema, body);

    expect(result).toEqual(body);
  })

  it("should throw an error when input data is invalid", async () => {
    const body = {
      content: '',
      title: 'April 24, 2023 at 12:34 PM'
    }

    expect(() => validateInput(noteDataSchema, body)).toThrowError("String must contain at least 5 character(s)");
  })
})
