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
                    <tr>
                        <th scope="row">Omiljeni žanr:</th>
                        <td>{{ user.genre.name }}</td>
                    </tr>
                </tbody>
            </table>
            <h5>Sačuvani filmovi:</h5>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Naziv</th>
                        <th scope="col">Žanr</th>
                        <th scope="col">Režiser</th>
                        <th scope="col">Dužina</th>
                        <th scope="col">Sačuvano</th>
                        <th scope="col">Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="user.bookmarks.length > 0" v-for="b of user.bookmarks">
                        <th scope="row">{{ b.bookmarkId }}</th>
                        <td>{{ b.movie.title }}</td>
                        <td>{{ b.movie.movieGenres[0].genre.name }}</td>
                        <td>{{ b.movie.director.name }}</td>
                        <td>{{ b.movie.runTime }} min</td>
                        <td>{{ formatDate(b.createdAt) }}</td>
                        <td>
                            <div class="btn-group">
                                <RouterLink :to="`/movie/${b.movie.shortUrl}`" class="btn btn-sm btn-primary">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </RouterLink>
                                <RouterLink :to="`/movie/${b.movie.shortUrl}/reservation`"
                                    class="btn btn-sm btn-success">
                                    <i class="fa-solid fa-ticket"></i>
                                </RouterLink>
                                <button type="button" class="btn btn-sm btn-danger" @click="deleteBookmark(b)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="7">Nemate sačuvanih filmova</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-12 col-md-3">
            <h6>Preporučeni filmovi:</h6>
            <ul>
                <li v-for="m of user.recommended">
                    <RouterLink :to="`/movie/${m.movieId}`">{{ m.title }}</RouterLink>
                </li>
            </ul>
        </div>
    </div>
    <Loading v-else />
</template>