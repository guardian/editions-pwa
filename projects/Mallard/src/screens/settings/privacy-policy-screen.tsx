import React from 'react';
import type { NavigationInjectedProps } from 'react-navigation';
import { LoginHeader } from 'src/components/login/login-layout';
import { html } from 'src/helpers/webview';
import { PRIVACY_POLICY_HEADER_TITLE } from 'src/helpers/words';
import { DefaultInfoTextWebview } from './default-info-text-webview';

const privacyPolicyHtml = html`
	<h2><strong>About this privacy policy</strong></h2>
	<p>
		This is a privacy policy for the Guardian Editions app. The privacy
		policy explains how we (Guardian News &amp; Media Limited) collect, use,
		share and transfer your personal data when you use the Guardian Editions
		app. This is separate to how we collect and use your personal data on
		theguardian.com, which is explained on the website
		<strong>( https://www.theguardian.com/help/privacy-policy ).</strong>
	</p>
	<p>
		Where this app contains links to third party sites, you should read the
		privacy policy shown on their site.
	</p>
	<p>
		To compliment our global approach to privacy protection, this policy
		also incorporates specific information privacy rights granted to
		individuals under Australian privacy law to reflect our relationship
		with our Australian readers of the Australian Edition in the app.
	</p>
	<p>
		Personal data is any information about you by which you can be
		identified or be identifiable. This can include information such as:
	</p>
	<ul>
		<li>
			Your name, date of birth, email address, postal address, phone
			number, mobile number, financial details, such as payment cards you
			use to purchase this product and register with us
		</li>
		<li>
			Information about your device (such as the IP address, which is a
			numerical code to identify your device that can provide information
			about the country, region or city where you are based) information
			relating to how you use and interact with this app
		</li>
		<li>
			When we refer to ‘personal data’ in this privacy policy, we are also
			referencing ‘personal information’ as defined by Australian privacy
			law.
		</li>
	</ul>
	<br />
	<h3>Who we are and how to contact us</h3>
	<p>
		The data controller for the Guardian Editions is Guardian News &amp;
		Media Limited, Kings Place, 90 York Way, London N1 9GU. This means that
		we are responsible for deciding how and why we hold and use your
		personal data. If you want to contact us, you can find our contact
		details in the “How to contact us” section below.
	</p>
	<h3>What personal data we collect and how we use it</h3>
	<p>We collect personal data via:</p>
	<ul>
		<li>
			The registration process for a Guardian account through the Guardian
			website
		</li>
		<li>
			When you use any of the Editions apps services, such as the various
			region specific curated editions of editorial content, and
			Crosswords
		</li>
		<li>
			Technology similar to cookies when you use mobile devices to access
			the content in the app
		</li>
		<li>
			When you email us directly about the app or when you contact us via
			our app
		</li>
	</ul>
	<br />
	<h3>Registering an account with us</h3>
	<p>
		To access the Guardian Editions app, you will need to register for a
		Guardian account and obtain a Digital Subscription. When you register
		for a Guardian account on theguardian.com we collect:
	</p>

	<ul>
		<li>Your name</li>
		<li>Your email address</li>
		<li>
			Some limited data from your social media profile, such as your
			username if you have signed in to theguardian.com using your social
			media details
		</li>
		<li>
			Your ID details, e.g, if you register through a third party
			application, e.g. Apple ID
		</li>
		<li>Your photograph, if you add one to your profile page</li>
		<li>
			You can change or remove these details using the profile and
			settings area of your Guardian account. For more information about
			our use of your personal data via the Guardian website, please see
			our privacy policy
			<strong
				>( https://www.theguardian.com/help/privacy-policy ).</strong
			>
		</li>
	</ul>
	<br />
	<h3>When you use the Guardian Editions app</h3>
	<p>
		When you use this app, we also use technology that is similar to cookies
		to collect additional data, including:
	</p>
	<ul>
		<li>
			Your IP address - a numerical code to identify your device and which
			can provide information about the country, region or city where you
			are based
		</li>
		<li>
			Your browsing history of the content and screens you have viewed on
			this app to understand how you use the app and to improve it
		</li>
		<li>
			Details of your devices, for example, the unique device ID used to
			access our content
		</li>
		<li>
			Information on bugs and technical issues, such as the app crashing
		</li>
	</ul>
	<p>
		Where we rely on cookies to collect any personal data across all our
		apps and sites, please see our cookie policy
		<strong>( https://www.theguardian.com/info/cookies )</strong> for more
		information and how to manage your cookie choices.
	</p>
	<p>
		You can manage our use of your personal data through the Privacy
		Settings feature in the app. You can also delete the list of articles
		that you have recently viewed and cached in the local storage on your
		mobile device via the settings of the app. You can also manage receiving
		notifications on your mobile device via the app in the settings of the
		app.
	</p>
	<h3>How we use your personal data</h3>
	<p>
		We use personal data collected through our app for a number of purposes
		related to this app, including the following:
	</p>
	<ul>
		<li>
			To provide the services you sign up for, including accessing your
			Digital Subscription that enables you to access the Editions app or
			related internal administrative purposes - such as our accounting
			and records - and to make you aware of any changes to our services
			once you have subscribed to the Editions app
		</li>
		<li>
			To analyse how visitors use our app so that we can improve the
			experience and the functions of the app
		</li>
		<li>To send you service notifications about this app</li>
		<li>
			To send marketing communications when we have your permission, or
			when permitted by law
		</li>
		<li>
			To remember your settings and to recognise you when you sign in on
			different devices
		</li>
		<li>
			To carry out marketing analysis, for example, we look at what you
			have viewed on this app to determine whether we think you might be
			interested in hearing from us about our other Guardian products and
			services. You can opt out from having your personal data used for
			marketing analysis by going into your theguardian.com account to the
			tab “Emails and marketing”
		</li>
		<li>
			To analyse the performance of this app and to understand how
			visitors use it
		</li>
		<li>To respond to your queries and to resolve complaints</li>
		<li>
			For security and fraud prevention, and to ensure that our app is
			safe and secure and used in line with our terms and conditions of
			use (https://www.theguardian.com/help/terms-of-service )
		</li>
		<li>To comply with applicable laws and regulations</li>
		<li>
			To enable us to detect and fix any bugs or defects within the app
		</li>
	</ul>
	<br />
	<h3>Legal grounds for using your personal data</h3>
	<p>
		We use personal data collected through this app only when we have a
		valid reason and the legal grounds to do so. We determine the legal
		grounds based on the purposes for which we have collected your personal
		data. The legal ground will be one of the following:
	</p>
	<ul>
		<li>
			<em>Consent:</em> For example, where you have provided your consent
			to receive marketing emails from us. You can withdraw your consent
			at any time. In the case of marketing emails you can withdraw your
			consent by clicking on the “unsubscribe” link at the bottom of the
			email or through your email preferences in the “emails and
			marketing” tab, when signed into your Guardian account.
		</li>
		<li>
			<em
				>Performance of a contract with you (or in order to take steps
				prior to entering into a contract with you):</em
			>
			For example, where you have purchased a subscription from us and we
			need to use your contact details and payment data in order to
			process your order and deliver your subscription.
		</li>
		<li>
			<em>Compliance with law:</em> In some cases, we may have a legal
			obligation to use or keep your personal data.
		</li>
		<li>
			<em>Our legitimate interests:</em> Where it is necessary for us to
			understand our readers, promote our services and operate our sites
			and apps efficiently for the creation, publication and distribution
			of news, media and related journalistic content both online and in
			print form, globally. Examples of when we rely on our legitimate
			interests to use your personal data include: when we analyse what
			content has been viewed on our sites and apps, so that we can
			understand how they are used and improve our content.
		</li>
		<li>
			Personal data that we receive about you from other organisations
		</li>
		<li>Adding to or combining the personal data you provide to us</li>
	</ul>
	<p>
		When you sign up to a Digital Subscription to access the Editions app,
		we may add to the personal data you give us by combining it with other
		personal data shared with us by other trusted organisations. This
		includes, for example, the region that you are located in, so that we
		can show you the prices for subscriptions or other products in your
		local currency. We may also add personal data to improve the accuracy of
		your delivery address when we send out mail. We may also obtain your
		personal data from partners whose offers we include in some of our
		marketing communications and we use this personal data to ensure that we
		do not send you irrelevant marketing.
	</p>
	<p>
		We also use information on the content you have viewed on our sites and
		apps and your interaction with the content to add you to groups with
		similar interests and preferences, so that we can make our online
		advertising on our other sites and apps more relevant to you. Sometimes
		we use data about your interests or demographics that third parties have
		collected from you online to add to these groups. The way we use
		personal data to provide personalised advertising is described in our
		cookie policy
		<strong>( https://www.theguardian.com/info/cookies ).</strong>
	</p>
	<h3>Using children’s personal data</h3>
	<p>
		This app is not aimed directly at children under the age of 13 and we do
		not knowingly collect personal data via this app about children under
		13. Some of our services may have a higher age restriction and this will
		be shown at the point of registration.
	</p>
	<h3>Security of your personal data</h3>
	<p>
		We have implemented appropriate technical and organisational controls to
		protect your personal data against unauthorised processing and against
		accidental loss, damage or destruction. You are responsible for choosing
		a secure password when we ask you to set up a password to access parts
		of our sites or apps. You should keep this password confidential and you
		should choose a password that you do not use on any other site. You
		should not share your password with anyone else, including anyone who
		works for us. Unfortunately, sending any information, including personal
		data, via the internet is not completely secure. Although we will do our
		best to protect your personal data once with us, we cannot guarantee the
		security of any personal data sent to our site while still in transit
		and so you provide it at your own risk.
	</p>
	<h3>Who we share your personal data with</h3>
	<p><em>Within the Guardian group of companies</em></p>
	<p>
		Depending on where you live, we may share your personal data within the
		Guardian group of companies in the UK, US, or Australia. We may share it
		in order to perform a contract with you, for administrative purposes, or
		when we have a legitimate interest in doing so, such as for use related
		to marketing and advertising.
	</p>
	<p><em>With external organisations</em></p>
	<p>
		We may share your data with other organisations that provide services on
		our behalf such as fraud prevention services, services that assist with
		tracking errors and defects in the app, as well as services that deal
		with online payments and other forms of payment processing, ie credit
		card transactions We may reveal your personal data to any law
		enforcement agency, court, regulator, government authority or other
		organisation if we are required to do so to meet a legal or regulatory
		obligation, or otherwise to protect our rights or the rights of anyone
		else We may reveal your personal data to any other organisation that
		buys, or to which we transfer all, or substantially all, of our assets
		and business. If this sale or transfer takes place, we will use
		reasonable efforts to try to make sure that the organisation we transfer
		your personal data to uses it in line with our privacy policy Any
		organisations which access your data in the course of providing services
		on our behalf will be governed by strict contractual restrictions to
		make sure that they protect your data and keep to all data privacy laws
		that apply. We may also independently audit these service providers to
		make sure that they meet our standards.
	</p>
	<p>
		For a full list of who we may share data with that we collect via the
		Guardian website, please see the Guardian.com privacy policy
		<strong>( https://www.theguardian.com/help/privacy-policy ).</strong>
	</p>
	<h3>International data transfers</h3>
	<p>
		Data we collect may be transferred to, stored and processed in any
		country or territory where one or more of our Guardian group companies
		or service providers are based or have facilities. While other countries
		or territories may not have the same standards of data protection as
		those in your home country, we will continue to protect personal data
		that we transfer in line with this privacy policy.
	</p>
	<p>
		Whenever we transfer your personal data out of the European Economic
		Area (EEA), we ensure similar protection and put in place at least one
		of these safeguards:
	</p>
	<p>
		We will only transfer your personal data to countries that have been
		found to provide an adequate level of protection for personal data We
		may also use specific approved contracts that use Standard Contractual
		Clauses for the protection of personal data where appropriate, with our
		service providers that are based in countries outside the EEA, including
		those based in the US and Australia. These contracts give your personal
		data the same protection it has in the EEA. If you are located in the
		EEA, you may contact us for a copy of the safeguards which we have put
		in place for the transfer of your personal data outside the EEA.
	</p>
	<h3>How long we keep your personal data</h3>
	<p>
		We keep your personal data for only as long as we need to. How long we
		need your personal data depends on what we are using it for, as set out
		in this privacy policy. For example, we may need to use it to answer
		your queries about a product or service and as a result may keep
		personal data while you are still using our product or services. We may
		also need to keep your personal data for accounting purposes, for
		example, where you have bought a subscription. If we no longer need your
		data, we will delete it or make it anonymous by removing all details
		that identify you. If we have asked for your permission to process your
		personal data and we have no other lawful grounds to continue with that
		processing, and you withdraw your permission, we will delete your
		personal data. However, when you unsubscribe from marketing
		communications, we will keep your email address to ensure that we do not
		send you any marketing in future.
	</p>
	<h3>How we may contact you</h3>
	<p><em>Service communications</em></p>
	<p>
		From time to time we may send you service emails, for example, telling
		you your subscription is coming to an end or thanking you when you
		contribute or place an order with us.
	</p>
	<p><em>Marketing communications and editorial newsletters</em></p>
	<p>
		While there is no online advertising on this app, we may send you
		materials we think may interest you, such as new Guardian offers and
		updates, if we have your permission. Depending on your marketing
		preferences, this may be by email, phone, SMS or post. You can manage
		your preferences through the tab “Emails and marketing” when you are
		signed in to your Guardian account through our website.
	</p>
	<h3>Responding to your queries or complaints</h3>
	<p>
		If you have raised a query or a complaint with us, we may contact you to
		answer your query or to resolve your complaint.
	</p>
	<br />
	<h3>Your rights with regard to the personal data that we hold about you</h3>
	<p>
		You have a number of rights with regard to the personal data that we
		hold about you and you can contact us with regard to the following
		rights in relation to your personal data:
	</p>
	<ul>
		<li>
			You have the right to receive a copy of the personal data we hold
			about you
		</li>
		<li>
			You have the right to correct the personal data we hold about you
		</li>
		<li>
			Where applicable, you may also have a right to receive a
			machine-readable copy of your personal data
		</li>
		<li>
			You also have the right to ask us to delete your personal data or
			restrict how it is used, consistent with the GDPR. There may be
			exceptions to the right to erasure for specific legal reasons which,
			if applicable, we will set out for you in response to your request
		</li>
		<li>
			Where applicable, you have the right to object to processing of your
			personal data for certain purposes
		</li>
		<li>
			Where you have provided us with consent to use your personal data,
			you can withdraw this at any time
		</li>
		<li>
			If you do not want us to use your personal data for marketing
			analysis, you can change your settings in the “Emails and marketing”
			tab of your Guardian account
		</li>
	</ul>
	<h3>Your rights under the Australian Privacy Act</h3>
	<p>
		Your rights to privacy are also protected by the Australian Privacy
		Principles in force under the Privacy Act 1988 (Cth). These privacy laws
		place requirements on us to treat your personal information collected in
		line with those principles, including to disclose to you what personal
		information we collect about you and how we use it, to store your
		information securely and to allow you to exercise the following rights:
	</p>
	<p>
		Right of access to the personal information held about you; and Right of
		correction to correct your information when it is incorrect. These
		principles and rights are reflected throughout this privacy policy.
	</p>
	<p>
		If you would like to exercise any of your rights specified above, please
		email dataprotection@theguardian.com or write to the Data Protection
		Officer at Guardian News &amp; Media Limited, Kings Place, 90 York Way,
		London N1 9GU. We will deal with requests within one month.
	</p>
	<p>
		We may need to request specific information from you to help us confirm
		your identity. If your request is complicated or if you have made a
		large number of requests, it may take us longer. We will let you know if
		we need longer than one month to respond. You will not have to pay a fee
		to obtain a copy of your personal data (or to exercise any of the other
		rights). However, we may charge a reasonable fee if your request is
		clearly unfounded, repetitive or excessive.
	</p>
	<h3>Contact us for information about how we use your personal data</h3>
	<p>
		If you have any questions about how we use your personal data or if you
		have a concern about how your personal data is used, please contact the
		Data Protection Officer at Guardian News &amp; Media Limited, Kings
		Place, 90 York Way, London N1 9GU. Or, email
		dataprotection@theguardian.com.
	</p>
	<p>Complaints will be responded to within 30 days.</p>
	<p>
		If you are not satisfied with the way your concern has been handled, you
		can refer your complaint to the Information Commissioner’s Office.
	</p>
	<p>
		If you have a question about anything else, please see our Contact us
		information under Settings -&gt; Help in this app.
	</p>
	<h3>Changes to the Privacy Policy</h3>
	<p>
		We post changes that we make to our privacy policy here. If the changes
		are significant, we may also choose to email all our registered users
		with the new details. If required by law, we will get your permission or
		give you the opportunity to opt out of any new uses of your data. The
		most recent changes to this privacy policy were made in May 2020 and
		October 2020. Other changes are available upon request.
	</p>
`;

const PrivacyPolicyScreen = () => (
	<DefaultInfoTextWebview html={privacyPolicyHtml} />
);

PrivacyPolicyScreen.navigationOptions = {
	title: PRIVACY_POLICY_HEADER_TITLE,
};

const PrivacyPolicyScreenForOnboarding = ({
	navigation,
}: NavigationInjectedProps) => (
	<>
		<LoginHeader onDismiss={() => navigation.goBack()}>
			{PRIVACY_POLICY_HEADER_TITLE}
		</LoginHeader>
		<DefaultInfoTextWebview html={privacyPolicyHtml} />
	</>
);

export { PrivacyPolicyScreen, PrivacyPolicyScreenForOnboarding };
