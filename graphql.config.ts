import type { IGraphQLConfig } from 'graphql-config'
import { DATOCMS_API_TOKEN } from './lib/client'

const defaultConfig = {
	dedupeOperationSuffix: true,
	dedupeFragments: true,
	pureMagicComment: false,
	exportFragmentSpreadSubTypes: true,
	namingConvention: "keep",
	skipDocumentsValidation: false,
}

const config: IGraphQLConfig = {
	schema: {
		[`https://graphql.datocms.com`]: {
			headers: {
				"Authorization": DATOCMS_API_TOKEN,
				"X-Exclude-Invalid": 'true'
			},
		},
	},
	documents: "graphql/**/*.gql",
	extensions: {
		codegen: {
			overwrite: true,
			generates: {
				"graphql/index.ts": {
					plugins: ["typed-document-node"],
					config: { ...defaultConfig }
				},
				"types/payload.d.ts": {
					plugins: [
						"typescript",
						"typescript-operations",
					],
					config: { ...defaultConfig, noExport: true }
				},
				"types/document-modules.d.ts": {
					plugins: ["typescript-graphql-files-modules"],
					config: { ...defaultConfig }
				},
			},
		}
	},
}

export default config;