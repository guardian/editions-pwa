import {
    issuePath,
    mediaPath,
    frontPath,
    Issue,
    Collection,
    Front,
    CAPIArticle,
} from 'src/common'
import RNFetchBlob from 'rn-fetch-blob'

export interface PathToIssue {
    localIssueId: Issue['localId']
    publishedIssueId: Issue['publishedId']
}

export interface PathToArticle {
    collection: Collection['key']
    front: Front['key']
    article: CAPIArticle['key']
    localIssueId: Issue['localId']
    publishedIssueId: Issue['publishedId']
}

export const APIPaths = {
    issue: issuePath,
    front: frontPath,
    media: mediaPath,
    mediaBackend: 'https://d2cf1ljtg904cv.cloudfront.net/', // TODO: Use s3 issue paths.
}

const issuesDir = `${RNFetchBlob.fs.dirs.DocumentDir}/issues`

const issueRoot = (localIssueId: string) => `${issuesDir}/${localIssueId}`
const mediaRoot = (localIssueId: string) => `${issueRoot(localIssueId)}/media`

export const FSPaths = {
    issuesDir,
    issueRoot,
    mediaRoot,
    media: (localIssueId: string, source: string, path: string) =>
        `${mediaRoot(localIssueId)}/cached/${source}/${path}`,
    issueZip: (localIssueId: string) => `${issueRoot(localIssueId)}.zip`,
    issue: (localIssueId: string) => `${issueRoot(localIssueId)}/issue`,
    collection: (localIssueId: string, collectionId: string) =>
        `${issueRoot(localIssueId)}/collection/${collectionId}`,
    front: (localIssueId: string, frontId: string) =>
        `${issueRoot(localIssueId)}/front/${frontId}`,
}
