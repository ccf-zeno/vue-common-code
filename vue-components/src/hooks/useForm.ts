import { useTemplateRef } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';

export interface UseFormOption {
  refName?: string;
}

export interface UseFormReturn {
  formRef: ReturnType<typeof useTemplateRef<FormInstance>>;
  checkForm: () => Promise<boolean>;
}

export const useForm = (options: UseFormOption = {}): UseFormReturn => {
  const { refName = 'formRef' } = options;

  const formRef = useTemplateRef<FormInstance>(refName);

  async function checkForm() {
    if (!formRef.value) {
      return false;
    }

    const error = await formRef.value.validate();

    if (error) {
      return false;
    }

    return true;
  }

  return {
    formRef,
    checkForm,
  };
};
