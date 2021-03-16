import { renderCaption } from '../components/images';

describe('html', () => {
	describe('renderCaption', () => {
		it('renders just the caption when the credit is undefined', () => {
			expect(
				renderCaption({
					caption: 'caption',
				}),
			).toBe('caption');
		});

		it('renders just the caption when displayCredit is false', () => {
			expect(
				renderCaption({
					caption: 'caption',
					credit: 'credit',
					displayCredit: false,
				}),
			).toBe('caption');
		});

		it('renders just the caption when displayCredit is undefined', () => {
			expect(
				renderCaption({
					caption: 'caption',
					credit: 'credit',
				}),
			).toBe('caption');
		});

		it('renders both the caption and credit in that order when both are defined and displayCredit is true', () => {
			expect(
				renderCaption({
					caption: 'caption',
					credit: 'credit',
					displayCredit: true,
				}),
			).toBe('caption credit');
		});
	});
});
