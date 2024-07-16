"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import { SubscriptionPlan } from "@/types-db"

interface SubscribtionPlanFormProps {
  initialData : SubscriptionPlan;
}

const formSchema = z.object({
  name : z.string().min(1),
  price : z.coerce.number().min(1),
  description : z.string().min(1),
})

const SubscriptionPlanForm = ({ initialData  } : SubscribtionPlanFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      description: "",
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Edit Membership" : "Create Membership"
  const description = initialData ? "Edit a Membership" : "Add a new Membership"
  const toastMessage = initialData ? "Membership Updated" : "Membership Created"
  const action = initialData ? "Save Changes" : "Create Membership"

  const onSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/subscribtion-plans/${params.membershipId}`, data);

      } else {
          await axios.post(`/api/${params.storeId}/subscribtion-plans`, data);
      }

      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/memberships`)

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

      await axios.delete(`/api/${params.storeId}/subscribtion-plans/${params.membershipId}`);
      

      toast.success("Membership Removed")
      router.refresh()
      router.push(`/${params.storeId}/memberships`)

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


            <div className="grid grid-cols-3 gap-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Membership name..." {...field} />
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
                  name="description"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input disabled={isLoading} placeholder="Membership description..." {...field} />
                        </FormControl>
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

export default SubscriptionPlanForm