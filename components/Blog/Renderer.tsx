import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getRichTextRenderOptions } from './renderOptions'

const Renderer = ({ richTextBody, renderH2Links }: any) => {
  return (
    <div className="prose prose-xl text-skin-secondary mt-8 mx-auto">
      {documentToReactComponents(
        richTextBody.json,
        getRichTextRenderOptions({ renderH2Links })
      )}
    </div>
  )
}

export default Renderer
