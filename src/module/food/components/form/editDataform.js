import { editFood } from "@/common/query/food";
import { Button, Group, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { notifications } from '@mantine/notifications';

const handleValidateForm = (data, field) => {
    return (data === '' || data === null ? `${field} must filled` : null)
}

export default function EditDataForm(props) {
    const { isOpen } = props
    const form = useForm({
        initialValues: {
            name: '',
            category: '',
            description: '',
            createdBy: '',
        },

        validate: {
            name: (value) => handleValidateForm(value, 'Name'),
            category: (value) => handleValidateForm(value, 'Category'),
            description: (value) => handleValidateForm(value, 'Description'),
            createdBy: (value) => handleValidateForm(value, 'Created By'),
        },
    });

    /**set data to form when form edit open */
    useEffect(() => {
        form.setFieldValue('name', props.detailData.name);
        form.setFieldValue('category', props.detailData.category);
        form.setFieldValue('description', props.detailData.description);
        form.setFieldValue('createdBy', props.detailData.createdBy);
    }, [isOpen])

    const handleCloseModal = () => {
        props.onClose();
        form.reset();
    }

    const { mutate, isLoading } = useMutation(() => editFood(props.detailData.id, form.values), {
        onSuccess: (response) => {
            if (response.status === 200) {
                handleCloseModal();
                props.refetch();
                notifications.show({
                    title: 'Success',
                    message: 'Success edited data!',
                })
            }
        },
        onError: () => {
            notifications.show({
                title: 'Failed',
                message: 'Failed edit data!',
                color: 'red'
            })
        }
    });

    return (
        <>
            <Modal
                opened={props.isOpen}
                withCloseButton
                onClose={handleCloseModal}
                size="md"
                radius="md"
                title="Edit Food"
            >
                <form onSubmit={form.onSubmit(() => mutate())}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Input your name food"
                        {...form.getInputProps('name')}
                    />
                    <Select
                        label="Category"
                        withAsterisk
                        style={{ marginTop: "10px" }}
                        placeholder="Pick one"
                        data={[
                            { value: 'jajanan', label: 'Jajanan' },
                            { value: 'minuman', label: 'Minuman' },
                            { value: 'roti', label: 'Roti' },
                            { value: 'kue', label: 'Kue' },
                        ]}
                        {...form.getInputProps('category')}
                    />
                    <Textarea
                        style={{ marginTop: "10px" }}
                        withAsterisk
                        label="Description"
                        placeholder="Input your description product"
                        {...form.getInputProps('description')}
                    />

                    <TextInput
                        withAsterisk
                        label="CreatedBy"
                        placeholder="Input your createdBy"
                        {...form.getInputProps('createdBy')}
                    />
                    <Group align="flex-end" style={{ marginTop: "20px" }}>
                        <Button
                            type="submit"
                            loading={isLoading}
                        >
                            Save
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
}