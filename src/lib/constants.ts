export const SUNLIGHT_OPTIONS = [
  { label: 'Select...', value: '' },
  { label: 'Full Sun', value: 'FULL_SUN' },
  { label: 'Partial Sun', value: 'PARTIAL_SUN' },
  { label: 'Shade', value: 'SHADE' }
];

export const DIFFICULTY_OPTIONS = [
  { label: 'Select...', value: '' },
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Expert', value: 'EXPERT' }
];

export const STATUS_OPTIONS = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Archived', value: 'ARCHIVED' }
];

export const FLOWER_TYPE_OPTIONS = [
  { label: 'Select...', value: '' },
  { label: 'Single', value: 'Single' },
  { label: 'Double', value: 'Double' },
  { label: 'Triple', value: 'Triple' }
];

export const FLOWER_COLOR_OPTIONS = [
  { label: 'Select...', value: '' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Red', value: 'Red' },
  { label: 'Purple', value: 'Purple' },
  { label: 'White', value: 'White' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Multi-color', value: 'Multi-color' }
];

// Helper arrays for API validation
export const VALID_SUNLIGHTS = SUNLIGHT_OPTIONS.map(o => o.value).filter(Boolean);
export const VALID_DIFFICULTIES = DIFFICULTY_OPTIONS.map(o => o.value).filter(Boolean);
export const VALID_STATUSES = STATUS_OPTIONS.map(o => o.value).filter(Boolean);
export const VALID_FLOWER_TYPES = FLOWER_TYPE_OPTIONS.map(o => o.value).filter(Boolean);
export const VALID_FLOWER_COLORS = FLOWER_COLOR_OPTIONS.map(o => o.value).filter(Boolean);
