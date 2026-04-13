import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion } from '@/components/ui/accordion';

describe('Accordion', () => {
  it('renders content', () => {
    render(
      <Accordion type="single" collapsible>
        <div>Item</div>
      </Accordion>,
    );

    expect(screen.getByText('Item')).toBeInTheDocument();
  });
});
