import React from 'react'
import { withNavigation } from 'react-navigation'
import { Header } from 'src/components/layout/header/header'
import { SpecialEditionHeaderStyles } from '../../../../Apps/common/src'
import { IssueTitle } from '../issue/issue-title'

export const ScreenHeader = ({
    headerStyles,
    leftAction,
    onPress,
    rightAction,
    title,
    subTitle,
}: {
    headerStyles?: SpecialEditionHeaderStyles
    leftAction?: React.ReactElement | null
    onPress?: () => void
    rightAction?: React.ReactElement | null
    subTitle?: string
    title?: string
}) => (
    <Header
        onPress={onPress}
        action={rightAction}
        leftAction={leftAction}
        headerStyles={headerStyles}
    >
        {title && (
            <IssueTitle
                title={title}
                subtitle={subTitle}
                overwriteStyles={headerStyles}
            />
        )}
    </Header>
)
