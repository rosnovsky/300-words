import { afterEach, describe, expect, it, vi } from 'vitest'
import { errorHandler } from './errorHandler'
import { NextResponse } from 'next/server'

describe('errorHandler', () => {
  it('should return a NextResponse', () => {
    const res = new NextResponse()
    const error = new Error('Test error')
    const errorMessage = 'Test error message'
    const result = errorHandler(res, error, errorMessage)
    expect(result).toBeInstanceOf(NextResponse)
  })

  it('should return a NextResponse with a status of 500', () => {
    const res = new NextResponse()
    const error = new Error('Internal server error')
    const errorMessage = ''
    const result = errorHandler(res, error, errorMessage)
    expect(result.status).toBe(500)
  })

})
