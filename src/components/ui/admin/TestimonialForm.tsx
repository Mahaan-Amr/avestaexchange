import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Testimonial } from '@prisma/client'

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSubmit: (data: Partial<Testimonial>) => void
  onCancel: () => void
}

export function TestimonialForm({
  testimonial,
  onSubmit,
  onCancel
}: TestimonialFormProps) {
  const [currentLang, setCurrentLang] = useState<'en' | 'fa'>(testimonial?.language || 'en')
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    content: testimonial?.content || '',
    image: testimonial?.image || '',
    rating: testimonial?.rating || 5,
    isActive: testimonial?.isActive ?? true,
    language: currentLang
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, language: currentLang })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={currentLang} onValueChange={(value) => setCurrentLang(value as 'en' | 'fa')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="fa">فارسی</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={currentLang === 'fa' ? 'font-vazirmatn text-right' : ''}
            dir={currentLang === 'fa' ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <Label>Role</Label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
            className={currentLang === 'fa' ? 'font-vazirmatn text-right' : ''}
            dir={currentLang === 'fa' ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <Label>Content</Label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            className={currentLang === 'fa' ? 'font-vazirmatn text-right' : ''}
            dir={currentLang === 'fa' ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <Label>Image URL (optional)</Label>
          <Input
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        <div>
          <Label>Rating (1-5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label>Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {testimonial ? 'Update' : 'Create'} Testimonial
        </Button>
      </div>
    </form>
  )
} 