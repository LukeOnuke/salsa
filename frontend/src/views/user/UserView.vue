<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BookmarkModel } from '@/models/bookmark.model';
import type { UserModel } from '@/models/user.model';
import { BookmarkService } from '@/services/bookmark.service';
import { UserService } from '@/services/user.service';
import { formatDate, showConfirm } from '@/utils';
import { ref } from 'vue';

const user = ref<UserModel>()
const logout = useLogout()
UserService.getSelfUser()
    .then(rsp => user.value = rsp.data)
    .catch(e => logout(e))

function deleteBookmark(model: BookmarkModel) {
    showConfirm(`Obrisi sačuvan film ${model.movie.title}?`, () => {
        BookmarkService.deleteBookmark(model.bookmarkId)
            .then(rsp => {
                if (user.value == null) return
                user.value!.bookmarks = user.value?.bookmarks.filter(b =>
                    b.bookmarkId !== model.bookmarkId
                )
            })
            .catch(e => logout(e))
    })
}
</script>

<template>
    <Navigation />
    <div class="row mt-3" v-if="user">
        <div class="col-12 col-md-9">
            <h3>Korisnički nalog</h3>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Ime:</th>
                        <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Prezime:</th>
                        <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email:</th>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telefon:</th>
                        <td>{{ user.phone }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Loading v-else />
</template>