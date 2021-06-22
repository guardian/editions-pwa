import { Content, ContentSerde } from '@guardian/content-api-models/v1/content'
import { TBufferedTransport, TCompactProtocol } from 'thrift'

const encodeContent = async (data: Content): Promise<Buffer> => {
    try {
        let buffer = Buffer.from([])
        const transport = new TBufferedTransport(buffer, outBuffer => {
            if (outBuffer) {
                buffer = Buffer.concat([buffer, outBuffer])
            } else {
                return Promise.reject('Failed to write Content to buffer')
            }
        })

        const protocol = new TCompactProtocol(transport)
        ContentSerde.write(protocol, data)
        protocol.flush()
        transport.flush()
        return buffer
    } catch (error) {
        return Promise.reject(error)
    }
}

export { encodeContent }
