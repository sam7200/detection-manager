import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Button, Tag, Modal, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea, ProFormDependency } from '@ant-design/pro-components';

const { Search } = Input;

interface Component {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  tags: string[];
  description?: string;
  options?: string;
  placeholder?: string;
  defaultValue?: string;
}

const initialComponents: Component[] = [
  { id: '1', name: '温度传感器', type: '数字', createdAt: '2023-05-20', tags: ['传感器', '温度'] },
  { id: '2', name: '湿度控制', type: '开关', createdAt: '2023-05-21', tags: ['控制器', '湿度'] },
  { id: '3', name: '空气质量描述', type: '多行文本', createdAt: '2023-05-22', tags: ['描述', '空气质量'] },
];

const componentTypes = [
  { label: '单行文本', value: '单行文本' },
  { label: '多行文本', value: '多行文本' },
  { label: '数字', value: '数字' },
  { label: '密码', value: '密码' },
  { label: '下拉选择框', value: '下拉选择框' },
  { label: '复选框', value: '复选框' },
  { label: '单选按钮', value: '单选按钮' },
  { label: '日期选择器', value: '日期选择器' },
  { label: '时间选择器', value: '时间选择器' },
  { label: '日期时间选择器', value: '日期时间选择器' },
  { label: '开关', value: '开关' },
];

const ComponentManagement: React.FC = () => {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);
  const [previewComponent, setPreviewComponent] = useState<Component | null>(null);

  // ... (保留之前的 columns, handleSearch, handleEdit, handleDelete, handlePreview 函数)

  const handleFormFinish = async (values: any) => {
    if (editingComponent) {
      setComponents(components.map(component =>
        component.id === editingComponent.id ? { ...component, ...values } : component
      ));
      message.success('组件已成功更新');
    } else {
      const newComponent = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setComponents([...components, newComponent]);
      message.success('新组件已成功创建');
    }
    setIsModalVisible(false);
  };

  const renderPreview = (component: Component) => {
    switch (component.type) {
      case '单行文本':
        return <Input placeholder={component.placeholder} />;
      case '多行文本':
        return <Input.TextArea placeholder={component.placeholder} />;
      case '数字':
        return <Input type="number" placeholder={component.placeholder} />;
      case '密码':
        return <Input.Password placeholder={component.placeholder} />;
      case '下拉选择框':
        return (
          <Select
            style={{ width: '100%' }}
            placeholder={component.placeholder}
            options={component.options?.split(',').map(option => ({ label: option.trim(), value: option.trim() }))}
          />
        );
      case '复选框':
        return (
          <Checkbox.Group
            options={component.options?.split(',').map(option => ({ label: option.trim(), value: option.trim() }))}
          />
        );
      case '单选按钮':
        return (
          <Radio.Group>
            {component.options?.split(',').map(option => (
              <Radio key={option.trim()} value={option.trim()}>{option.trim()}</Radio>
            ))}
          </Radio.Group>
        );
      case '日期选择器':
        return <DatePicker style={{ width: '100%' }} />;
      case '时间选择器':
        return <TimePicker style={{ width: '100%' }} />;
      case '日期时间选择器':
        return <DatePicker showTime style={{ width: '100%' }} />;
      case '开关':
        return <Switch />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* ... (保留之前的搜索和表格代码) */}
      <Modal
        title={editingComponent ? "编辑组件" : "新增组件"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Row gutter={24}>
          <Col span={14}>
            <ProForm
              onFinish={handleFormFinish}
              initialValues={editingComponent || {}}
              onValuesChange={(_, values) => setPreviewComponent(values as Component)}
            >
              <ProFormText
                name="name"
                label="组件名称"
                rules={[{ required: true, message: '请输入组件名称' }]}
              />
              <ProFormSelect
                name="type"
                label="组件类型"
                options={componentTypes}
                rules={[{ required: true, message: '请选择组件类型' }]}
              />
              <ProFormSelect
                name="tags"
                label="标签"
                mode="tags"
                placeholder="输入标签"
                rules={[{ required: true, message: '请输入至少一个标签' }]}
              />
              <ProFormTextArea
                name="description"
                label="描述"
                placeholder="请输入组件描述"
              />
              <ProFormDependency name={['type']}>
                {({ type }) => {
                  if (['下拉选择框', '复选框', '单选按钮'].includes(type)) {
                    return (
                      <ProFormTextArea
                        name="options"
                        label="选项"
                        placeholder="请输入选项，用英文逗号分隔"
                        rules={[{ required: true, message: '请输入选项' }]}
                      />
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
              <ProFormText
                name="placeholder"
                label="占位符文本"
                placeholder="请输入占位符文本"
              />
              <ProFormText
                name="defaultValue"
                label="默认值"
                placeholder="请输入默认值"
              />
            </ProForm>
          </Col>
          <Col span={10}>
            <Card title="组件预览">
              {previewComponent && (
                <div>
                  <h3>{previewComponent.name}</h3>
                  {renderPreview(previewComponent)}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ComponentManagement;