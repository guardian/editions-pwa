import React from 'react';
import { html } from 'src/helpers/webview';
import { DefaultInfoTextWebview } from './default-info-text-webview';

const burgerMenuSVG = () => html`
	<svg
		width="40"
		height="40"
		viewBox="0 0 82 82"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="41" cy="41" r="41" fill="#FFE500" />
		<rect
			x="17.5714"
			y="25.381"
			width="48.8096"
			height="3.90478"
			fill="#052962"
		/>
		<rect
			x="17.5714"
			y="39.0476"
			width="48.8096"
			height="3.90477"
			fill="#052962"
		/>
		<rect
			x="17.5714"
			y="52.7143"
			width="48.8096"
			height="3.90476"
			fill="#052962"
		/>
	</svg>
`;

const settingsCogSVG = () => html`
	<svg
		width="40"
		height="40"
		viewBox="0 0 77 77"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M0.999998 38.5C0.999997 59.2107 17.7893 76 38.5 76C59.2107 76 76 59.2107 76 38.5C76 17.7893 59.2107 0.999999 38.5 0.999998C17.7893 0.999997 0.999999 17.7893 0.999998 38.5Z"
			fill="#052962"
			stroke="white"
		/>
		<path
			d="M56.3977 43.0511L60.9489 42.0795C61.0511 40.9034 61.1023 39.7273 61.1023 38.5C61.1023 37.3239 61.0511 36.0966 60.9489 34.9205L56.3977 33.9489C56.0398 32.2614 55.2727 30.625 54.5057 29.142L56.9091 25.2557C55.4261 23.3636 53.7386 21.6761 51.8466 20.1932L47.9602 22.5966C46.375 21.8295 44.8409 21.0625 43.1534 20.7045L42.1818 16.1534C41.0057 16.0511 39.7784 16 38.6023 16C37.4261 16 36.0966 16 35.0227 16.1534L34.0511 20.7045C32.3636 21.0625 30.6761 21.8295 29.2443 22.5966L25.358 20.1932C23.4659 21.625 21.6761 23.4148 20.2955 25.2557L22.8011 29.142C21.9318 30.6761 21.267 32.2614 20.8068 33.9489L16.358 34.9205C16.1534 36.0966 16 37.2216 16 38.5C16 39.6761 16.1534 41.0057 16.358 42.0795L20.8068 43.0511C21.267 44.7386 21.9318 46.4261 22.8011 47.8068L20.2955 51.7443C21.6761 53.6364 23.4659 55.375 25.358 56.8068L29.2443 54.3011C30.6761 55.1705 32.3636 55.8352 34.0511 56.2955L35.0227 60.7443C36.0966 60.9489 37.4261 61.1023 38.6023 61.1023C39.8807 61.1023 41.0057 60.9489 42.1818 60.7443L43.1534 56.3977C44.8409 55.8352 46.375 55.1705 47.9602 54.3011L51.8466 56.8068C53.6875 55.4261 55.4773 53.6364 56.9091 51.7443L54.5057 47.858C55.2727 46.4261 56.0398 44.7386 56.3977 43.0511ZM38.6023 52.9716C30.625 52.9716 24.1307 46.4773 24.1307 38.5C24.1307 30.5227 30.625 24.0284 38.6023 24.0284C46.5795 24.0284 53.0739 30.5227 53.0739 38.5C53.0739 46.4773 46.5795 52.9716 38.6023 52.9716Z"
			fill="white"
		/>
	</svg>
`;

const appLogoSVG = () => html`
	<svg
		width="40"
		height="40"
		viewBox="0 0 150 150"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="150" height="150" rx="15" fill="#052962" />
		<circle cx="107.5" cy="107.5" r="30" fill="#90DCFF" />
		<circle cx="107.5" cy="45" r="30" fill="#FFBAC8" />
		<circle cx="45" cy="107.5" r="30" fill="#FF7F0F" />
		<circle cx="45" cy="45" r="30" fill="white" />
		<path
			d="M46.0615 20.1275H46.0015C38.2015 20.1275 33.6415 30.8075 34.0015 45.1475V45.2675C33.6415 59.4875 38.2015 70.1675 46.0015 70.1675H46.0615V71.3075C34.5415 72.0875 18.8215 63.2675 19.0015 45.2675V45.1475C18.8215 27.0875 34.5415 18.2675 46.0615 19.0475V20.1275ZM50.0215 19.5275C54.8215 20.1875 60.0415 23.2475 62.0215 25.4075V35.2475H61.0015L50.0215 20.6675V19.5275ZM65.6815 47.3675L62.0215 48.9875V65.1875C60.0415 67.1675 55.0015 70.1075 50.0215 71.0075V48.5675L46.4815 47.3075V46.2875H65.6815V47.3675Z"
			fill="#052962"
		/>
	</svg>
`;

const editionsMenuButton = () => html`
	<svg
		width="40"
		height="40"
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

const faqHtml = html`
	<h2>The Guardian Editions FAQs</h2>
	<h3>Contents</h3>
	<ul>
		<li>What is The Guardian Editions app?</li>
		<li>
			What makes the Guardian Editions app different to the Guardian Live
			app?
		</li>
		<li>How do I purchase the Editions app?</li>
		<li>How do I access the Editions app?</li>
		<li>How do I access different Editions within the app?</li>
		<li>Can I access the Editions app on more than one device?</li>
		<li>What time is the latest edition available each day?</li>
		<li>How many days of editions can I access?</li>
		<li>Can I use the Editions app when I&rsquo;m abroad?</li>
		<li>How do I access crosswords?</li>
		<li>Can I access video in the Editions app?</li>
		<li>How do I change the font size?</li>
		<li>Is there a dark mode?</li>
		<li>How do I share content?</li>
		<li>Can I hide the weather?</li>
		<li>Are there versions for regions outside of the UK and Australia?</li>
		<li>
			I used to read the Daily app, how is the new Editions app different?
		</li>
		<li>I have feedback, where should I send it?</li>
		<li>Where can I find out more about my subscription?</li>
		<li>How do I cancel my subscription?</li>
		<li>Is an issue published on Christmas Day?</li>
	</ul>
	<br />
	<h3>What is The Guardian Editions app?</h3>
	<p>
		The Editions app includes the UK Daily edition, Australia Weekend and
		other special editions all in one app.
	</p>
	<p>
		<strong>The UK Daily</strong> brings you the coverage you need for the
		day, giving you a considered alternative to the never-ending news feed.
		Beautifully designed and easy to navigate on mobile and tablet, the
		Daily brings you the stories that matter every morning.
	</p>
	<p>
		The UK Daily is published daily - each edition available to read by 6am
		(GMT), 7 days a week.
	</p>
	<p>
		<strong>Australia Weekend</strong> brings you The Guardian&rsquo;s
		perspective and analysis on the most important stories from throughout
		the week, to be enjoyed across the weekend.
	</p>
	<p>
		Australia Weekend is published weekly - each edition available to read
		by 6am (AEST), every Saturday.
	</p>
	<p>
		<strong>The Guardian Editions app features:</strong>
	</p>
	<p>
		<strong>A new way to read</strong> - newspapers, reimagined for mobile
		and tablet
	</p>
	<p>
		<strong>Easy to navigate</strong> - read it all, or swipe to the
		sections you care about
	</p>
	<p>
		<strong>Read offline</strong> - download and read whenever it suits you
	</p>
	<p>
		<strong>Multiple devices</strong> - beautifully designed for your mobile
		or tablet on iOS and Android
	</p>
	<p>
		<strong>Ad-free</strong> - enjoy our journalism uninterrupted, without
		adverts.
	</p>
	<h3>
		What makes the Guardian Editions app different to the Guardian Live app?
	</h3>
	<p>
		The Guardian Live app features all articles found on our website and you
		can follow live news coverage as it happens. The Editions app offers an
		alternative to live news coverage, providing a finite selection of
		articles put together by our editorial teams in the UK and Australia.
	</p>
	<h3>How do I purchase the Guardian Editions app?</h3>
	<p>
		The Guardian Editions app is available as part of a Digital
		subscription, or a print+digital subscription, details of which can be
		found on our website.
	</p>
	<p>
		The Guardian&rsquo;s complete digital subscription is built to fit with
		any routine. Two innovative apps, plus ad-free reading on
		theguardian.com, will give you an enhanced experience of our reporting
		across all your devices. You&rsquo;ll enjoy our coverage in a way that
		suits you - and you&rsquo;ll provide valuable support to The
		Guardian&rsquo;s independent, award-winning journalism.
	</p>
	<p>
		<strong>The Guardian Editions app</strong> - which includes the UK Daily
		edition, Australia Weekend and a special environment Edition
	</p>
	<p>
		<strong>Premium access to the Live app</strong> - breaking news, sport
		and opinion, updated throughout the day.
	</p>
	<p>
		<strong>Ad-free</strong> - no adverts and no interruptions across all
		your devices.
	</p>
	<p>You can find out more about subscribing and pricing on our website.</p>
	<p>
		You can also access the Guardian Editions app on compatible iOS devices
		if you have an existing iTunes subscription to the Guardian old Daily
		Edition. Please note, the Guardian Editions app is no longer available
		to purchase as a stand-alone product in iTunes. If you have a Live app
		Premium tier subscription through Apple or Google Play, your
		subscription doesn't include access to Guardian Editions. For access to
		both the Guardian Live app and Guardian Editions app we recommend that
		you subscribe to our Guardian Digital subscription package. More details
		about the package can be found on the Guardian website.
	</p>
	<h3>How do I access the Guardian Editions app?</h3>
	<p>
		Once you have purchased a digital subscription, the Guardian Editions is
		available to download from either
		<a
			href="https://apps.apple.com/gb/app/the-guardian-daily-edition/id452707806"
			>here</a
		>
		for iOS devices (iOS 12.4 and above), or
		<a
			href="https://play.google.com/store/apps/details?id=com.guardian.editions"
			>here</a
		>
		for the Android version (Android 5.0 Lollipop and above).
	</p>
	<p>
		Once you have downloaded the Guardian Editions app, press the app icon
		on your device to open. ${appLogoSVG()}
	</p>
	<p>
		Within the Guardian Editions app you will be asked if you are already a
		subscriber, by selecting sign-in you will be prompted to enter your
		Guardian account details.
	</p>
	<p>
		From here, enter the same Guardian account details associated with your
		Digital subscription.
	</p>
	<p>
		If you do not remember your Guardian account details you can also access
		the app using your Subscriber ID. Your Subscriber ID can be found on
		your subscription confirmation email. If you are a Paper + Digital
		subscriber, your subscriber ID can also be found on the vouchers you
		exchange for the newspaper. To enter, tap the yellow button on top right
		hand corner of the home page, and then select the cog icon to access the
		settings screen:
	</p>
	<p>
		From the settings menu tap &lsquo;I am already subscribed&rsquo;, then
		&lsquo;Activate with subscriber ID&rsquo;
	</p>
	<p>
		If you are an existing iTunes subscriber, the app will automatically
		detect your iTunes login details provided you are using the same device
		used to access your previous subscription to the Guardian Edition app.
	</p>
	<p>
		If you are using a new Apple device, tap on the yellow button top right
		corner, then tap the cog icon to open settings. From here, click 'I am
		already subscribed', then tap Restore App Store subscription where you
		will be prompted to enter your iTunes account sign-in details.
	</p>
	<p>
		If you choose to sign in with Apple please choose to share rather than
		hide your email address with us. This allows us to match you to your
		existing Guardian subscription.
	</p>
	<p>
		If you opted to hide your email, and would like to change that choice so
		that we can match your email to your Guardian subscription, please see
		<a href="https://support.apple.com/en-us/HT210426"
			>the information here</a
		>
		on how to manage your apps that use Sign in with Apple. Removing
		authorisation for the Guardian Editions app and signing in with Apple
		again will give you the opportunity again to share your email address
		with us.
	</p>
	<p>
		You can find out more about setting up a Guardian account on our
		website.
	</p>
	<h3>How do I access different Editions?</h3>
	<p>
		Tap on the Edition selector button on the top left hand corner of the
		home screen, this will open a new screen where you can select different
		Editions. ${editionsMenuButton()}
	</p>
	<h3>Can I access the Guardian Editions app on more than one device?</h3>
	<p>
		Yes, If you are a Digital subscriber, you can access the app on up to 10
		devices on either Apple or Android operating systems.
	</p>
	<p>
		If you are an existing iTunes subscriber, you can access on up to 10
		iPad and iPhone devices.
	</p>
	<h3>What time is the latest edition available each day?</h3>
	<p>The UK Daily edition is typically available from 6am GMT each day.</p>
	<p>
		The Australia Weekend edition is typically available from 6am AEST on
		Saturday.
	</p>
	<h3>Can I use the Guardian Editions app when I&rsquo;m abroad?</h3>
	<p>
		Yes, we advise checking with your operator prior to using the app abroad
		as most monthly plans charge extra for data roaming while overseas. As
		this can often be expensive, either sync using Wi-Fi and read the
		edition offline or contact your service provider for details of how to
		purchase cut-price roaming tariffs.
	</p>
	<h3>How do I access crosswords?</h3>
	<p>
		The UK Daily features crosswords everyday and can always be found at the
		bottom of the home page.
	</p>
	<p>
		Australia Weekend features a crossword in every week&rsquo;s edition and
		can always be found at the bottom of the home page.
	</p>
	<h3>Can I access video in the Guardian Editions app?</h3>
	<p>
		Yes, the app gives you access to videos featured in the last 30 days of
		editions while your device is online. To listen to a video audio, your
		phone or tablet ring should be ON, not silent.
	</p>
	<h3>How do I change the font size?</h3>
	<p>
		Article text size can be adjusted within the accessibility settings on
		your device.
	</p>
	<h3>Is there a dark mode?</h3>
	<p>
		It's currently not available, but we might have it in the future if
		there's strong demand.
	</p>
	<h3>How do I share content?</h3>
	<p>
		Articles available for sharing have a share icon on the right hand side
		near the top of the article page.
	</p>
	<p>
		For technical reasons, currently, not all articles are available for
		sharing and therefore won&rsquo;t have a share icon. Articles are
		available for sharing if a web version of the article is published
		before the day&rsquo;s issue is published. There's also some print-only
		content only available on the Editions app and the printed newspaper,
		not the web.
	</p>
	<h3>Can I hide the weather ?</h3>
	<p>
		You can elect to show or hide the weather in the Settings page of the
		app.
	</p>
	<h3>Are there versions for regions outside of the UK and Australia?</h3>
	<p>
		More regionalised versions are something we intend to introduce. When a
		local version is available in your region, you will be notified in app
		or over email.
	</p>
	<h3>
		I used to read the Daily app, how is the new Editions app different?
	</h3>
	<p>
		You can still access the UK Daily edition within the Guardian Editions
		app. We have changed the name when we introduced the Australia Weekend
		edition in October 2020, to reflect the fact you can now access multiple
		regional editions as well as one-off special editions.
	</p>
	<h3>
		I have feedback on the Guardian Editions app, where should I send it?
	</h3>
	<p>
		If you have any feedback or suggestions for our development team, you
		can contact us through the app by tapping on the yellow button in the
		top right corner ${burgerMenuSVG()}, then tap the cog icon
		${settingsCogSVG()} to open settings and select Help. You can also email
		Editions.feedback@theguardian.com.
	</p>
	<h3>Where can I find out more information about my subscription?</h3>
	<p>You’ll find more Digital subscription FAQs on our website.</p>
	<h3>How do I cancel my subscription?</h3>
	<p>
		If you are a Digital or Print+Digital subscriber and no longer wish to
		continue your subscription, please contact us using the details below.
	</p>
	<p>
		<strong>Contact us</strong>
	</p>
	<p>Email - customer.help@theguardian.com</p>
	<p>Phone:</p>
	<p>
		UK, Europe and rest of world<br />
		Tel: +44 (0) 330 333 6767<br />
		Lines are open 8am-8pm on weekdays, 8am-6pm at weekends (GMT/BST)
	</p>
	<p>
		Canada and USA<br />
		Tel: 1-844-632-2010 (toll free); 917-900-4663 (direct line)<br />
		Lines are open 9:15am - 6pm Monday - Friday (EST)
	</p>
	<p>
		Australia, New Zealand, and Asia Pacific<br />
		Tel: 1800 773 766 (from within Australia) or +61 2 8076 8599 (from
		outside Australia)
	</p>
	<p>
		If you have an iTunes Apple subscription, you can cancel your
		subscription via the settings menu on your iPhone or iPad as follows:
	</p>
	<ul>
		<li>Go to Settings > [your name] > iTunes &amp; App Store.</li>
		<li>Tap your Apple ID at the top of the screen.</li>
		<li>
			Tap View Apple ID. You might need to authenticate your Apple ID.
		</li>
		<li>Tap Subscriptions.</li>
		<li>
			From the Subscriptions page, tap Guardian. From here it is possible
			to disable auto-renewal
		</li>
		<li>
			You will continue to have access to the Editions app until the end
			of the subscription period
		</li>
	</ul>
	<br />
	<h3>Is an issue published on Christmas Day?</h3>
	<p>No, we don’t publish an issue on Christmas Day.</p>
`;

const FAQScreen = () => <DefaultInfoTextWebview html={faqHtml} />;

FAQScreen.navigationOptions = {
	title: 'FAQ',
};

export { FAQScreen };
