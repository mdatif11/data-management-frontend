import {Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text,useColorModeValue,useDisclosure,useToast,VStack,Box,Button,Heading,HStack,IconButton,Image,Input,} from "@chakra-ui/react";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { useItemStore } from "../store/item";

const ItemCard = ({item}) => {

    const {deleteItem,updateItem}=useItemStore();
    const [updatedItem,setUpdatedItem] = useState(item);
    const toast =useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleUpdateItem = async (id,updatedItem) => {
        const {success,message}=await updateItem(id,updatedItem);
        onClose();
        if(!success){
            toast({
                title: "Error in Updating",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: "Successfully Updated",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        }

    }
    const handleDeleteItem = async (id) =>{
        const {success,message} = await deleteItem(id); 
        if(!success){
            toast({
                title: "Error",
                description: "Error in updating",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: "Success",
                description: "Successfully updated",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        }
    }
    const textColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
        <Image src={item.image} alt={item.name} h={40} w='full' objectFit='cover'></Image>

        <Box p={4}>
			<Heading as='h3' size='md' mb={2}>
					{item.name}
			</Heading>

			<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${item.price}
			</Text>
			<HStack spacing={2}>
				<IconButton icon={<MdModeEdit />} colorScheme='yellow' onClick={onOpen}/>
				<IconButton icon={<TiDeleteOutline />} colorScheme='red' onClick={()=>handleDeleteItem(item._id)}/>
			</HStack>
		</Box>

        <Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<Input
								placeholder='Item Name'
								name='name'
								value={updatedItem.name}
								onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
						/>
						<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedItem.price}
								onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
						/>
						<Input
								placeholder='Image URL'
								name='image'
								value={updatedItem.image}
								onChange={(e) => setUpdatedProduct({ ...updatedItem, image: e.target.value })}
						/>
					</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3} onClick={()=> handleUpdateItem(item._id,updatedItem)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    </Box>
  )
}

export default ItemCard