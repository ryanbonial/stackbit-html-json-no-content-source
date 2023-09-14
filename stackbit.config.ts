import { defineStackbitConfig } from '@stackbit/types'
import { GitContentSource } from '@stackbit/cms-git'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '16',
  devCommand: 'npm run dev',  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/pages'],
      models: [{
        name: 'page',
        type: 'page',
        urlPath: '/{slug}',
        filePath: 'src/pages/{slug}.json',
        hideContent: true,
        fields: [
          { name: 'title', type: 'string', required: true },
          { name: 'sections', type: 'list', items: { type: 'model', models: ['paragraph', 'heading'] } },
        ],
      },
      {
        name: 'paragraph',
        type: 'object',
        labelField: 'content',
        fields: [{ name: 'content', type: 'markdown', required: true, default: '' }],
      },
      {
        name: 'heading',
        type: 'object',
        labelField: 'content',
        fields: [
          { name: 'content', type: 'string', required: true },
          { name: 'level', type: 'enum', required: true, options: [1, 2, 3, 4, 5, 6] },
        ],
      },],
    }),
  ],
})
