import React from 'react';
import { html } from 'src/helpers/webview';
import { BETA_PROGRAMME_FAQ_HEADER_TITLE } from 'src/helpers/words';
import { DefaultInfoTextWebview } from './default-info-text-webview';

// const bugButton = BugButtonSvg.
const bugButtonSvg = () => html`
	<svg
		version="1.1"
		width="60"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 82 82"
		style="enable-background:new 0 0 82 82;"
		xml:space="preserve"
	>
		<style type="text/css">
			.st0 {
				fill: #ffe500;
			}
		</style>
		<g>
			<circle class="st0" cx="41" cy="41" r="40" />
			<g>
				<path
					d="M29.1,18c3,0,5,4.9,5.8,7.4c-1.3,1.3-2.2,2.9-2.6,4.7c0.3,0,0.6-0.1,0.8-0.1H40h2h6.9c0.3,0,0.6,0,0.8,0.1
       c-0.4-1.8-1.3-3.5-2.6-4.7c0.7-2.5,2.8-7.4,5.8-7.4c0.6,0,1-0.4,1-1s-0.4-1-1-1c-4.2,0-6.6,5.5-7.4,8.1c-1.3-0.8-2.8-1.2-4.5-1.2
       c-1.6,0-3.2,0.4-4.5,1.2c-0.9-2.6-3.2-8.1-7.4-8.1c-0.6,0-1,0.4-1,1S28.5,18,29.1,18z"
				/>
				<path
					d="M63.1,62.6l-3.2-6.8c-0.1-0.3-0.4-0.5-0.8-0.6l-5.3-0.6c0.1-0.5,0.1-1.1,0.1-1.6v-6.1l4.3,0.9l3.2,4.2
       c0.2,0.3,0.5,0.4,0.8,0.4c0.2,0,0.4-0.1,0.6-0.2c0.4-0.3,0.5-1,0.2-1.4l-3.4-4.5c-0.1-0.2-0.3-0.3-0.6-0.4l-5-1.1v-4.7l5.4-1.7
       c0.2-0.1,0.4-0.2,0.5-0.4l3.2-4.4c0.3-0.4,0.2-1.1-0.2-1.4c-0.4-0.3-1.1-0.2-1.4,0.2l-3,4.1l-4.5,1.4v-1c0-1.5-0.7-2.9-1.8-3.8
       c-0.9-0.7-2-1.2-3.2-1.2H42v1v15.6c0,5.1,5.6,9.9,10.6,10c0.3-0.6,0.6-1.3,0.8-2l4.9,0.6l2.9,6.3c0.2,0.4,0.5,0.6,0.9,0.6
       c0.1,0,0.3,0,0.4-0.1C63.1,63.7,63.3,63.1,63.1,62.6z"
				/>
				<path
					d="M41.1,53.1c-1.3,3-3.9,5.4-7.1,6.4c-1.2,0.5-2.4,0.8-3.6,0.9C32.7,63.8,36.6,66,41,66c0,0,0,0,0,0s0,0,0,0
       c1.8,0,3.5-0.4,5-1c0,0,0,0,0,0c0,0,0.1,0,0.1-0.1c2.2-0.9,4-2.5,5.3-4.3C47.2,60,43,57,41.1,53.1z"
				/>
				<path
					d="M33.3,57.6c3.7-1.6,6.7-5.1,6.7-9V32.1h-6.9c-1.4,0-2.6,0.6-3.5,1.5c-0.9,0.9-1.5,2.2-1.5,3.5v1l-4.5-1.4l-3-4.1
       c-0.3-0.4-0.9-0.5-1.4-0.2c-0.4,0.3-0.5,0.9-0.2,1.4l3.2,4.4c0.1,0.2,0.3,0.3,0.5,0.4l5.4,1.7v4.7L23,46c-0.2,0.1-0.4,0.2-0.6,0.4
       L19,50.8c-0.3,0.4-0.3,1.1,0.2,1.4c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l3.2-4.2l4.3-0.9v6.1c0,0.5,0,1.1,0.1,1.6
       l-5.3,0.6c-0.3,0-0.6,0.3-0.8,0.6l-3.2,6.8c-0.2,0.5,0,1.1,0.5,1.3c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.7-0.2,0.9-0.6l2.9-6.3
       l4.9-0.6c0.1,0.5,0.3,1,0.5,1.4C30.1,58.1,32.5,57.8,33.3,57.6z"
				/>
			</g>
		</g>
	</svg>
`;

const editionsButton = () => html`
	<svg
		width="60"
		height="60"
		viewBox="0 0 42 42"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="21" cy="21" r="20.5" fill="#052962" stroke="white" />
		<circle cx="14.1751" cy="13.125" r="6.825" fill="white" />
		<circle cx="14.1751" cy="27.825" r="6.825" fill="#FF7F0F" />
		<circle cx="28.875" cy="13.125" r="6.825" fill="#FFBAC8" />
		<circle cx="28.875" cy="27.825" r="6.825" fill="#90DCFF" />
	</svg>
`;

const betaProgrammeFAQsHtml = html`
	<h1>The Guardian Editions (beta) FAQs</h1>
	<p><strong>Contents</strong></p>
	<ul>
		<li><strong>What is the Editions beta app?</strong></li>
		<li><strong>How do I become a beta tester?</strong></li>
		<li>
			<strong>
				How do I supply feedback or report bugs on the Editions beta?
			</strong>
		</li>
		<li>
			<strong>
				Which devices is the Editions beta app available on?
			</strong>
		</li>
		<li>
			<strong>
				Can I access the Editions beta app on more than one device?
			</strong>
		</li>
		<li><strong>How can I leave the beta app?</strong></li>
		<li>
			<strong>
				I have a question about my subscription, where can I find more
				FAQs?
			</strong>
		</li>
	</ul>
	<h2>What is the Editions beta app?</h2>
	<p>
		Thank you for your interest in the Guardian Editions beta. The beta
		version of the Guardian Editions app (current Daily app) provides you
		access to new developments in the app and also the new Australia Weekend
		edition.
	</p>
	<p>
		By joining our beta programme, you&rsquo;ll be helping us deliver the
		best experience possible by providing early feedback and reporting any
		bugs that you may encounter in the app. We have a limited number of beta
		places and your help is invaluable and much appreciated.
	</p>
	<p>
		Please note, if you currently access the Editions app with a
		subscription through Apple, you can not redeem your existing
		subscription within Testflight. Guardian Digital subscribers can access
		the beta app across both platforms - Android and iOS.
	</p>
	<h2>How do I become a beta tester?</h2>
	<p>On iPhone and iPads:</p>
	<p>
		1. Open the following link on your device:
		<a href="https://testflight.apple.com/join/O2EojUEl">
			https://testflight.apple.com/join/O2EojUEl</a
		>
	</p>
	<p>2. Download the Testflight app</p>
	<p>3. Install the beta version of the Guardian Editions app</p>
	<p>
		4. Once in the Guardian Editions app, sign in with the same email from
		your Digital subscription. You can sign in by tapping on the yellow menu
		and accessing the settings screen from the cog icon on the top left
		corner of the screen
	</p>
	<p>
		5.
		<strong>
			Allow notifications so that you can be aware of new updates
		</strong>
	</p>
	<p>On Android phones and tablets:</p>
	<p>
		1. Open the following link on your device:
		<a href="https://play.google.com/apps/testing/com.guardian.editions"
			>https://play.google.com/apps/testing/com.guardian.editions</a
		>
	</p>
	<p>2. Sign in to your Google account</p>
	<p>3. Follow the download instructions on Play Store</p>
	<p>
		4. Once in the Guardian Editions app, sign in with the same email from
		your Digital subscription. You can sign in by tapping on the yellow menu
		and accessing the settings screen from the cog icon on the top left
		corner of the screen
	</p>
	<h2>How to switch between UK and Australia editions?</h2>
	<p>
		Once in the app, you can access the new editions by tapping on the top
		left corner icon on your home screen.
	</p>
	<p>${editionsButton()}</p>
	<h2>How do I supply feedback or report bugs and issues?</h2>
	<p>If you want to report a technical issue:</p>
	<p>1. Tap the &lsquo;bug&rsquo; icon on the bottom right of the screen</p>
	<p>${bugButtonSvg()}</p>
	<p>
		2. Choose if you want to include diagnostic information* or not to your
		email
	</p>
	<p>
		3. Describe the steps that led to the bug. Please be as descriptive as
		possible to help us find and fix the issue
	</p>
	<p>
		4. Send the email to our beta team. After sending the email, you will
		receive an email confirmation shortly afterward.
	</p>
	<p>
		<em
			>*The diagnostic information will help us to detect the issues
			quicker. It tells us about your app version, device and subscription
			types.</em
		>
	</p>
	<p>
		If you want to comment on your experience or suggest a feature, this can
		be done from the Help section of the Settings menu (accessed via the cog
		icon).
	</p>
	<h2>Which devices is the Editions beta app available on?</h2>
	<p>
		The Editions beta app is available on any iPhone and iPad running iOS
		version 12.4 or later, and any Android phone or tablet running Android
		version 5 (lollipop) or later.
	</p>
	<h2>Can I access the Editions beta app on more than one device?</h2>
	<p>
		If you are a Guardian Digital subscriber, you can access it on up to 10
		devices on either Apple or Android operating systems. If you subscribe
		to the Daily Edition app directly with Apple, the beta app is
		unavailable at this moment in time.
	</p>
	<h2>How can I leave the beta app?</h2>
	<p>You can leave the beta programme at any time.</p>
	<p>On iPhone and iPads:</p>
	<p>
		Open the App Store app on your device, search for Guardian Editions app,
		and download it. It will automatically delete the beta version from
		Testflight.
	</p>
	<p>On Android phones and tablets:</p>
	<p>
		Open the Google Play app on your device, search for Guardian Editions
		app, and tap on &lsquo;Leave the program&rsquo;.
	</p>
`;

export const BetaProgrammeFAQsScreen = () => (
	<DefaultInfoTextWebview html={betaProgrammeFAQsHtml} />
);

BetaProgrammeFAQsScreen.navigationOptions = {
	title: BETA_PROGRAMME_FAQ_HEADER_TITLE,
};
