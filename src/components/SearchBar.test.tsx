import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Ask ChatGPT')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('calls onEnter when Enter key is pressed', () => {
    const onEnter = jest.fn();
    render(<SearchBar onEnter={onEnter} />);
    
    const input = screen.getByPlaceholderText('Ask ChatGPT');
    fireEvent.change(input, { target: { value: 'test message' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(onEnter).toHaveBeenCalledWith('test message');
  });

  it('does not call onEnter on key repeat', () => {
    const onEnter = jest.fn();
    render(<SearchBar onEnter={onEnter} />);
    
    const input = screen.getByPlaceholderText('Ask ChatGPT');
    fireEvent.change(input, { target: { value: 'test message' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', repeat: true });
    
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('maintains focus when clicking within the focused input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Ask ChatGPT');
    
    // Focus the input
    fireEvent.focus(input);
    
    // Click within the input while focused
    fireEvent.mouseDown(input);
    
    // Input should still be focused
    expect(input).toHaveFocus();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Ask ChatGPT');
    
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input).toHaveValue('test input');
  });

  it('does not call onEnter for non-Enter keypresses', () => {
    const onEnter = jest.fn();
    render(<SearchBar onEnter={onEnter} />);
    
    const input = screen.getByPlaceholderText('Ask ChatGPT');
    fireEvent.change(input, { target: { value: 'test message' } });
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    
    expect(onEnter).not.toHaveBeenCalled();
  });
});
