import React from 'react'
import { FlatList } from 'react-native'
import { Separator, TappableRow } from 'src/components/layout/ui/row'
/*
An item is what the list uses to draw its own row –
See https://facebook.github.io/react-native/docs/using-a-listview
*/
export interface Item<D> {
    key: string
    title: string
    explainer?: string
    data?: D
}

/*
<D> inside of an item is passed to the click handler.
This is the function that gets called when clicking a row.
D contains things like the route a row points or the text content of it
*/
export type OnPressHandler<D> = (item: D) => void

export const List = <D extends {}>({
    data,
    onPress,
}: {
    data: Item<D>[]
    onPress: OnPressHandler<D>
}) => {
    return (
        <FlatList
            ItemSeparatorComponent={Separator}
            ListFooterComponent={Separator}
            ListHeaderComponent={Separator}
            data={data}
            renderItem={({ item }) => (
                <TappableRow
                    onPress={() => {
                        if (item.data) onPress(item.data)
                    }}
                    {...item}
                ></TappableRow>
            )}
        />
    )
}
