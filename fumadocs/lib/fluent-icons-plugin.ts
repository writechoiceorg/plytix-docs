import type { LoaderPlugin } from 'fumadocs-core/source';
import { createElement, type ComponentType } from 'react';
import * as Icons from '@/components/icons';

/**
 * `icon` names allowed in meta.json / page frontmatter. Keys are the names the
 * content already uses (originally Lucide names), so content doesn't have to
 * change when the icon set does. Add a line here before using a new name.
 */
const iconNames: Record<string, ComponentType> = {
  Activity: Icons.PulseRegular,
  Archive: Icons.ArchiveRegular,
  ArrowRightLeft: Icons.ArrowSwapRegular,
  BarChart3: Icons.DataBarVerticalRegular,
  BookOpen: Icons.BookOpenRegular,
  Bot: Icons.BotRegular,
  Boxes: Icons.BoxMultipleRegular,
  Code: Icons.CodeRegular,
  FileText: Icons.DocumentTextRegular,
  Filter: Icons.FilterRegular,
  FolderTree: Icons.FolderListRegular,
  Group: Icons.GroupRegular,
  Image: Icons.ImageRegular,
  KeyRound: Icons.KeyRegular,
  Layers: Icons.LayerRegular,
  Link: Icons.LinkRegular,
  Link2: Icons.LinkMultipleRegular,
  List: Icons.ListRegular,
  ListChecks: Icons.TaskListLtrRegular,
  ListTree: Icons.TextBulletListTreeRegular,
  Package: Icons.BoxRegular,
  Plug: Icons.PlugConnectedRegular,
  Rocket: Icons.RocketRegular,
  Share2: Icons.ShareRegular,
  Sparkles: Icons.SparkleRegular,
  Tags: Icons.TagMultipleRegular,
  Upload: Icons.ArrowUploadRegular,
  User: Icons.PersonRegular,
  Webhook: Icons.ServerLinkRegular,
  Workflow: Icons.FlowchartRegular,
  Wrench: Icons.WrenchRegular,
};

/**
 * Fluent counterpart of fumadocs-core's `lucideIconsPlugin`: turns the string
 * `icon` on page tree nodes into a Fluent icon element.
 */
export function fluentIconsPlugin(): LoaderPlugin {
  function replaceIcon<T extends { icon?: unknown }>(node: T): T {
    if (typeof node.icon !== 'string') return node;
    const Icon = iconNames[node.icon];
    if (!Icon) console.warn(`[fluent-icons-plugin] Unknown icon detected: ${node.icon}.`);
    // Keyed: these are client components, so they reach the client as lazy
    // elements inside Fumadocs' child arrays.
    node.icon = Icon ? createElement(Icon, { key: node.icon }) : undefined;
    return node;
  }

  return {
    name: 'plytix:fluent-icons',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  };
}
