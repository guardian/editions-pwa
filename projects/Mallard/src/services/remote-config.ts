import remoteConfig from '@react-native-firebase/remote-config';

// see https://rnfirebase.io/remote-config/usage for docs

export type RemoteStringValue = string | undefined;

interface RemoteConfig {
	init(): void;
	getBoolean(key: RemoteConfigProperty): boolean;
	getString(key: RemoteConfigProperty): RemoteStringValue;
}

const remoteConfigDefaults = {
	logging_enabled: true,
	join_beta_button_enabled: false,
	lightbox_enabled: true,
	generate_share_url: true,
};

export const RemoteConfigProperties = [
	'logging_enabled',
	'join_beta_button_enabled',
	'lightbox_enabled',
	'generate_share_url',
] as const;

export type RemoteConfigProperty = typeof RemoteConfigProperties[number];

const configValues = {
	// fetch config, cache for 5mins. This cache persists when app is reloaded
	minimumFetchIntervalMillis: 300,
};

class RemoteConfigService implements RemoteConfig {
	init() {
		remoteConfig()
			.setDefaults(remoteConfigDefaults)
			.then(() => remoteConfig().setConfigSettings(configValues))
			.then(() => {
				remoteConfig()
					.fetchAndActivate()
					.then((activated) => {
						if (activated) {
							console.log('Remote config fetched & activated!');
							if (__DEV__) console.log(remoteConfig().getAll());
						} else {
							console.log('Remote config NOT activated!');
						}
					})
					.catch(() => {
						console.log('Remote config failed to fetch');
					});
			})
			.catch(() => {
				console.log(
					'Remote config not activated - something went wrong',
				);
			});
	}

	getBoolean(key: RemoteConfigProperty): boolean {
		return remoteConfig().getValue(key).asBoolean();
	}

	getString(key: RemoteConfigProperty): RemoteStringValue {
		return remoteConfig().getValue(key).asString();
	}
}

export const remoteConfigService = new RemoteConfigService();
