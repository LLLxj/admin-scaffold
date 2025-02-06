import { useRequest as CommonuseRequest, useLocale } from '@/hooks';
import Auth from '@/services/auth';
import type { IAuthLoginVo } from '@/services/auth/type';
import { Button, Form, Input, Spin } from 'antd';
import React from 'react';
import { history } from 'umi';
// import { t } from '@/i18n-lang'
import { useModel } from '@umijs/max';

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const { login } = useModel('auth');

  const { t } = useLocale();

  const loginRequest = CommonuseRequest(Auth.login, {
    onSuccess: (data: IAuthLoginVo) => {
      console.log(data);
      history.push('/dashboard');
    },
  });

  const submit = async () => {
    await form.validateFields();
    const formData = await form.getFieldsValue();
    login(formData);
  };

  return (
    <div>
      <Spin spinning={loginRequest?.loading}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            name="mobile"
            label={t('auth_login_mobile')}
            rules={[
              {
                required: true,
                message: t('auth_login_rule_mobile_message'),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('auth_login_password')}
            rules={[
              {
                required: true,
                message: t('auth_login_rule_password_message'),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type="primary"
              onClick={submit}
              disabled={loginRequest?.loading}
            >
              {t('auth_login_confirm')}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
