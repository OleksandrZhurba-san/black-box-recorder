<script setup lang="ts">
import { Cloud } from 'lucide-vue-next';
import Empty from '@/components/ui/empty/Empty.vue';
import EmptyHeader from '@/components/ui/empty/EmptyHeader.vue';
import EmptyMedia from '@/components/ui/empty/EmptyMedia.vue';
import EmptyTitle from '@/components/ui/empty/EmptyTitle.vue';
import EmptyDescription from '@/components/ui/empty/EmptyDescription.vue';
import EmptyContent from '@/components/ui/empty/EmptyContent.vue';
import Button from '@/components/ui/button/Button.vue';
</script>
<template>
  <Empty class="max-w-md bg-background text-foreground border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Cloud />
      </EmptyMedia>
      <EmptyTitle>Upload Your Combat Log File</EmptyTitle>
      <EmptyDescription>
        <p>You can find you log file in:</p>
        <p>Unix-like: ~/Documents/EVE/logs/Gamelogs/</p>
        <p>Windows: C:\AppData\Local\...</p>
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm">Upload File</Button>
    </EmptyContent>
  </Empty>
</template>
