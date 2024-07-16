"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { AlertModal } from "@/components/modal/alert-modal"
import { Checkbox } from "@/components/ui/checkbox"
import ImagesUpload from "@/components/images-upload"
import { Website } from "@/types-db"

interface WebsiteFormProps {
  initialData : Website;
}

const formSchema = z.object({
  name : z.string().min(1),
  price : z.coerce.number().min(1),
  images : z.object({url : z.string()}).array(),
  owner : z.string().min(1),
  url : z.string().optional(),
  ownerId : z.string().optional(),
  category : z.string().min(1),
  isFeatured : z.boolean().default(false).optional(),
})

const WebsiteForm = ({ initialData  } : WebsiteFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      images: [],
      owner: "",
      category: "",
      ownerId: "",
      url: "",
      isFeatured : false,
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Edit Website" : "Create Website"
  const description = initialData ? "Edit a Website" : "Add a new Website"
  const toastMessage = initialData ? "Website Updated" : "Website Created"
  const action = initialData ? "Save Changes" : "Create Website"

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/websites/${params.websiteId}`, data);

      } else {
          await axios.post(`/api/${params.storeId}/websites`, data);
      }

      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/websites`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${params.storeId}/websites/${params.websiteId}`);
      

      toast.success("Website Removed")
      router.refresh()
      router.push(`/${params.storeId}/websites`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
        setOpen(false)
    }
  }

  return (
    <>

      <AlertModal
        isOpen={open}
        onClose={() => {setOpen(false)}}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <div className="flex items-center justify-center">
        <Heading title={title} description={description} />
        {initialData && (
            <Button disabled={isLoading} variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4"/>
            </Button>
        )}
      </div>
      
      <Separator />

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">

            {/* images */}
            <FormField 
                control={form.control}
                name="images"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Website Image</FormLabel>
                        <FormControl className="pr-6">
                            <ImagesUpload 
                              value={field.value.map(image => image.url)}
                              onChange={(urls) => {
                                field.onChange(urls.map((url) => ({url})))
                              }}
                              onRemove={(url) => {
                                field.onChange(
                                  field.value.filter(current => current.url !== url)
                                )
                              }}
                          
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-3 gap-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="number" disabled={isLoading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website Owner..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website url..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="ownerId"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Id</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website ownerId..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
              <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Website category..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
              )}
              />
                      <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Featured</FormLabel>
                                    <FormDescription>
                                      This Website will be on home screen under feautured websites
                                    </FormDescription>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                        )}
                        />
            </div>

            <Button disabled={isLoading} type="submit" size={"sm"}>
              {action}
            </Button>
          </form>
      </Form>

    </>
  )
}

export default WebsiteForm