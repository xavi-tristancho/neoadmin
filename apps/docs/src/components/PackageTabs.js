import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

export default function PackageTabs({ code = '' }) {
  return (
    <Tabs
      defaultValue="npm"
      values={[
        { label: 'npm', value: 'npm' },
        { label: 'Yarn', value: 'yarn' },
      ]}>
      <TabItem value="npm">
        <CodeBlock language="bash">npm install --save {code}</CodeBlock>
      </TabItem>
      <TabItem value="yarn">
        <CodeBlock language="bash">yarn add {code}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
