import { flags } from '@/entrypoint/utils/targets';
import { makeMalSource } from '@/providers/sources/_helpers/mal';

export const zunimeScraper = makeMalSource({
  id: 'zunime',
  name: 'Zunime',
  rank: 125,
  embedIds: ['zunime-hd-2', 'zunime-miko', 'zunime-shiro', 'zunime-zaza'],
  flags: [flags.CORS_ALLOWED],
});
