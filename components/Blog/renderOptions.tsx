// import Image from 'next/image'
import { BLOCKS } from '@contentful/rich-text-types'

export function getRichTextRenderOptions(_options?: any) {
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (_node: any) => {
        console.log('nodeoptions', _node)
        return (
          <div className="relative w-48 h-48 overflow-hidden rounded">
            <h2>--Image Expected here--</h2>
          </div>
        )
      },
    },
  }
}
