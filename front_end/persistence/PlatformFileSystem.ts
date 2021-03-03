// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* eslint-disable rulesdir/no_underscored_properties */

import type * as Common from '../common/common.js';
import * as i18n from '../i18n/i18n.js';
import type * as TextUtils from '../text_utils/text_utils.js';

const UIStrings = {
  /**
  * @description Assertion error message when failing to load a file.
  */
  unableToReadFilesWithThis: '`PlatformFileSystem` cannot read files.',
};
const str_ = i18n.i18n.registerUIStrings('persistence/PlatformFileSystem.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class PlatformFileSystem {
  _path: string;
  _type: string;
  constructor(path: string, type: string) {
    this._path = path;
    this._type = type;
  }

  getMetadata(_path: string): Promise<{modificationTime: Date, size: number}|null> {
    return Promise.resolve(null);
  }

  initialFilePaths(): string[] {
    return [];
  }

  initialGitFolders(): string[] {
    return [];
  }

  path(): string {
    return this._path;
  }

  embedderPath(): string {
    throw new Error('Not implemented');
  }

  type(): string {
    // TODO(kozyatinskiy): remove type, overrides should implement this interface.
    return this._type;
  }

  async createFile(_path: string, _name: string|null): Promise<string|null> {
    return Promise.resolve(null);
  }

  deleteFile(_path: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  requestFileBlob(_path: string): Promise<Blob|null> {
    return Promise.resolve(null as Blob | null);
  }

  async requestFileContent(_path: string): Promise<TextUtils.ContentProvider.DeferredContent> {
    return {content: null, error: i18nString(UIStrings.unableToReadFilesWithThis), isEncoded: false};
  }

  setFileContent(_path: string, _content: string, _isBase64: boolean): void {
    throw new Error('Not implemented');
  }

  renameFile(_path: string, _newName: string, callback: (arg0: boolean, arg1?: string|undefined) => void): void {
    callback(false);
  }

  addExcludedFolder(_path: string): void {
  }

  removeExcludedFolder(_path: string): void {
  }

  fileSystemRemoved(): void {
  }

  isFileExcluded(_folderPath: string): boolean {
    return false;
  }

  excludedFolders(): Set<string> {
    return new Set();
  }

  searchInPath(_query: string, _progress: Common.Progress.Progress): Promise<string[]> {
    return Promise.resolve([]);
  }

  indexContent(progress: Common.Progress.Progress): void {
    queueMicrotask(() => {
      progress.done();
    });
  }

  mimeFromPath(_path: string): string {
    throw new Error('Not implemented');
  }

  canExcludeFolder(_path: string): boolean {
    return false;
  }

  contentType(_path: string): Common.ResourceType.ResourceType {
    throw new Error('Not implemented');
  }

  tooltipForURL(_url: string): string {
    throw new Error('Not implemented');
  }

  supportsAutomapping(): boolean {
    throw new Error('Not implemented');
  }
}
