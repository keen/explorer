import { AppState } from '../types';

export const getTagsPool = ({ project }: AppState) => project.tagsPool;
