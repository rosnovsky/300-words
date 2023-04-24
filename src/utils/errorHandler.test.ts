import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { errorHandler } from './errorHandler'
import { NextApiResponse } from 'next'

vi.mock('NextApiResponse', () => {
  return {
    status: vi.fn(),
    json: vi.fn(),
  }
})

describe('errorHandler', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return json with error message', () => {
    const res = {
      status: vi.fn().mockReturnValue(500),
      json: vi.fn(),
    } as Partial<NextApiResponse> as NextApiResponse

    const error = new Error('test error message')

    errorHandler(res, error, "test error message")

    expect(res.json).toHaveBeenCalledWith({
      error: 'test error message',
    })
  })

  it('should return json with error default', () => {
    const res = {
      status: vi.fn().mockReturnValue(500),
      json: vi.fn(),
    } as Partial<NextApiResponse> as NextApiResponse

    const error = new Error()
    // @ts-expect-error
    errorHandler(res, error, undefined)

    expect(res.json).toHaveBeenCalledWith({
      error: 'An error occurred while processing your request.',
    })
  })
})
