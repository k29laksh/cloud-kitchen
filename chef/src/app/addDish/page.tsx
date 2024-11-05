'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, X } from "lucide-react"
import { toast } from 'sonner'
import { useAddDishMutation } from '@/redux/Service/dish' 
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation'


interface FoodImage {
  fileName: string
  fileType: string
  fileContent: string
}

interface FoodItemForm {
  name: string
  description: string
  ingredients: string[]
  timeToDeliver: string
  veg: boolean
  price: string
  foodImages: FoodImage[]
}

export default function AddFoodItemForm() {
  const router=useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FoodItemForm>({
    defaultValues: {
      ingredients: [''],
      foodImages: [],
      veg: true
    }
  })

  const ingredients = watch('ingredients')
  const foodImages = watch('foodImages')

  const [addDish] = useAddDishMutation()

  const onSubmit = async (data: FoodItemForm) => {
    console.log('Data being sent to backend:', data);  // Check the structure here
    setIsSubmitting(true);
    try {
      await addDish(data).unwrap();
      toast("Food item added successfully!");
      router.push('/allDishes')
    } catch (error) {
      console.error('Error submitting form:', error);
      toast("There was a problem adding the food item.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log("files",files)
    const compressedImages = await Promise.all(files.map(async (file) => {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      return await imageCompression(file, options);
    }));
  
    const newFoodImages: FoodImage[] = [];
  
    for (const file of compressedImages) {
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          newFoodImages.push({
            fileName: file.name,
            fileType: file.type,
            fileContent: reader.result as string,
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    console.log("newimgs",newFoodImages)
  
    setValue('foodImages', [...foodImages, ...newFoodImages]);
  };
  
  
  const removeImage = (index: number) => {
    setValue('foodImages', foodImages.filter((_, i) => i !== index))
  }

  const addIngredient = () => {
    setValue('ingredients', [...ingredients, ''])
  }

  const removeIngredient = (index: number) => {
    setValue('ingredients', ingredients.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Food Item</CardTitle>
        <CardDescription>Fill in the details to add a new item to your menu.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Food Name</Label>
            <Input id="name" {...register('name', { required: 'Food name is required' })} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Ingredients</Label>
            <AnimatePresence>
              {ingredients.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Input {...register(`ingredients.${index}` as const, { required: 'Ingredient is required' })} />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" variant="outline" onClick={addIngredient} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Ingredient
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeToDeliver">Time to Deliver (minutes)</Label>
              <Input id="timeToDeliver" type="number" {...register('timeToDeliver', { required: 'Time is required' })} />
              {errors.timeToDeliver && <p className="text-sm text-red-500">{errors.timeToDeliver.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" {...register('price', { required: 'Price is required' })} />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="veg"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="veg"
                />
              )}
            />
            <Label htmlFor="veg">Vegetarian</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foodImages">Food Images</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="foodImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label htmlFor="foodImages" className="cursor-pointer">
                <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
                  Choose Images
                </div>
              </Label>
              <p className="text-sm text-muted-foreground">
                {foodImages.length} image(s) selected
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <AnimatePresence>
                {foodImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <img
                      src={image.fileContent}
                      alt={`Food image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Food Item...
            </>
          ) : (
            'Add Food Item'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
