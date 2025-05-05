import React from 'react';
import {Text, View} from 'react-native';
import {Text as SlateText} from 'slate';

const HASHTAG_REGEX = /#[\p{L}\d_]+/gu;

const renderText = (leaf, index) => {
  const {
    text,
    bold,
    italic,
    underline,
    strikethrough,
    color,
    fontSize,
    fontFamily,
  } = leaf;

  const parts = text.split(HASHTAG_REGEX);
  const tags = text.match(HASHTAG_REGEX) || [];

  const children = [];
  parts.forEach((part, i) => {
    if (part) {
      children.push(
        <Text key={`part-${index}-${i}`} style={{}}>
          {part}
        </Text>,
      );
    }
    if (i < tags.length) {
      children.push(
        <Text
          key={`tag-${index}-${i}`}
          style={{color: '#5aa7ff', fontWeight: 'bold'}}>
          {tags[i]}
        </Text>,
      );
    }
  });

  let formatted = children;
  if (bold) formatted = <Text style={{fontWeight: 'bold'}}>{formatted}</Text>;
  if (italic)
    formatted = <Text style={{fontStyle: 'italic'}}>{formatted}</Text>;
  if (underline)
    formatted = (
      <Text style={{textDecorationLine: 'underline'}}>{formatted}</Text>
    );
  if (strikethrough)
    formatted = (
      <Text style={{textDecorationLine: 'line-through'}}>{formatted}</Text>
    );

  const style = {
    color,
    fontSize,
    fontFamily,
  };

  return (
    <Text key={index} style={style}>
      {formatted}
    </Text>
  );
};

const renderNode = (node, index) => {
  if (SlateText.isText(node)) return renderText(node, index);

  const children = node.children?.map((child, idx) =>
    renderNode(child, `${index}-${idx}`),
  );

  switch (node.type) {
    case 'heading-one':
      return (
        <Text
          key={index}
          style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8}}>
          {children}
        </Text>
      );
    case 'heading-two':
      return (
        <Text
          key={index}
          style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
          {children}
        </Text>
      );
    case 'bulleted-list':
    case 'numbered-list':
      return (
        <View key={index} style={{paddingLeft: 16, marginBottom: 8}}>
          {children}
        </View>
      );
    case 'list-item':
      return (
        <View key={index} style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 4}}>•</Text>
          <Text>{children}</Text>
        </View>
      );
    default:
      return (
        <Text key={index} style={{marginBottom: 8}}>
          {children}
        </Text>
      );
  }
};

export default function SlateViewerRN({content}) {
  let parsedContent = [];

  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = [
        {
          type: 'paragraph',
          children: [{text: content}],
        },
      ];
    }
  } else if (Array.isArray(content)) {
    parsedContent = content;
  }

  return <View>{parsedContent.map((node, idx) => renderNode(node, idx))}</View>;
}
