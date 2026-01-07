<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
          v-for="(item, index) in items"
          :key="index"
          class="breadcrumbs__item"
      >
        <template v-if="item.to">
          <nuxt-link :to="item.to" class="breadcrumbs__link">
            {{ item.label }}
          </nuxt-link>
          <span class="breadcrumbs__separator">/</span>
        </template>

        <span v-else class="breadcrumbs__current" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<style lang="scss" scoped>
.breadcrumbs {
  padding: 10px 0;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }

  &__link {
    text-decoration: none;
    color: #000;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__separator {
    margin: 0 8px;
    color: #999;
    user-select: none;
  }

  &__current {
    color: #666;
    cursor: default;
  }
}
</style>